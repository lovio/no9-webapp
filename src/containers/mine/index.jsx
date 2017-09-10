import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut, getUserInfo } from 'actions/auth';

import MineView from 'components/mine';

class Mine extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return <MineView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  signOut,
  getUserInfo,
})(Mine);
