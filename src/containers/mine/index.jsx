import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut, getUserInfo } from 'actions/auth';
import { loadLevelups } from 'actions/user';

import MineView from 'components/mine';

class Mine extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    loadLevelups: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getUserInfo();
    this.props.loadLevelups();
  }

  render() {
    return <MineView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    levelups: state.getIn(['mine', 'levelups']),
  };
}

export default connect(mapStateToProps, {
  signOut,
  getUserInfo,
  loadLevelups,
})(Mine);
