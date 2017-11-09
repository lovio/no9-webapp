import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/auth';

import InviteView from 'components/mine/invite';

class Invite extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return <InviteView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, { getUserInfo })(Invite);
