import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadDailySummaries } from 'actions/user';
// import { authorizedRedirect } from 'actions/common';
import { getUserInfo } from 'actions/auth';

import HomeView from 'components/home';

class Home extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    loadDailySummaries: PropTypes.func.isRequired,
    summaries: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getUserInfo();
    if (!this.props.summaries.get('data').size) {
      this.props.loadDailySummaries();
    }
  }

  render() {
    return <HomeView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    summaries: state.getIn(['mine', 'summries']),
  };
}

export default connect(mapStateToProps, {
  getUserInfo,
  loadDailySummaries,
})(Home);
