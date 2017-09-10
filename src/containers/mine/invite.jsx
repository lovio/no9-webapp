// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InviteView from 'components/mine/invite';

function mapStateToProps(state) {
  return {
    referrerCode: state.get('user').get('referrerCode'),
  };
}

export default connect(mapStateToProps, {})(InviteView);
