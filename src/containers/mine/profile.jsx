import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from 'actions/user';
import { getUserInfo } from 'actions/auth';

import ProfileView from 'components/mine/profile';

class User extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return <ProfileView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['user']),
  };
}

export default connect(mapStateToProps, {
  getUserInfo,
  updateProfile,
})(User);
