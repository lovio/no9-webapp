// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InviteView from 'components/mine/invite';

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {})(InviteView);
