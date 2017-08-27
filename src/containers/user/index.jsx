import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserInfo, loadAbroadPlan, uploadAvatar, changeName } from 'actions/user';
import { signOut } from 'actions/auth';
import { initWechat } from 'actions/wx';

import UserView from 'components/user';

class User extends Component {
  static propTypes = {
    loadAbroadPlan: PropTypes.func.isRequired,
    loadUserInfo: PropTypes.func.isRequired,
    initWechat: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadAbroadPlan();
    this.props.loadUserInfo();
    this.props.initWechat({ type: 'image' });
  }

  render() {
    return <UserView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.getIn(['user', 'info']),
    abroadPlan: state.getIn(['user', 'abroadPlan']),
  };
}

export default connect(mapStateToProps, {
  loadAbroadPlan,
  loadUserInfo,
  initWechat,
  uploadAvatar,
  changeName,
  signOut,
})(User);
