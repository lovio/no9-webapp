import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSearch } from 'helpers/history';
import { getUser } from 'actions/common';
import { getMedals } from '../actions';
import MedalShareView from '../components/share';

class Share extends Component {
  static propTypes = {
    getMedals: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getMedals({
      userId: this.props.userId,
    });

    this.props.getUser({
      id: this.props.userId,
    });
  }

  render() {
    return <MedalShareView {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    medals: state.getIn(['medal', 'medals']),
    user: state.getIn(['common', 'user']),
    userId: props.match.params.userId,
    medalId: props.match.params.medalId,
    isApp: getSearch(props.location.search).isApp,
  };
}

export default connect(mapStateToProps, {
  getMedals,
  getUser,
})(Share);
