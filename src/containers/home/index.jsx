import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { loadUserData, loadCapabilityTest, loadUserInfo } from 'actions/user';
// import { authorizedRedirect } from 'actions/common';
import { getUserInfo } from 'actions/auth';

import HomeView from 'components/home';

class Home extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return <HomeView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  getUserInfo,
})(Home);
