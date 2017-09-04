import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from 'actions/auth';
// import { loadUserData, loadCapabilityTest } from 'actions/user';

import MineView from 'components/mine';

class Mine extends Component {
  static propTypes = {
    // loadUserData: PropTypes.func.isRequired,
    // loadCapabilityTest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.props.loadUserData();
    // this.props.loadCapabilityTest();
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
  // loadUserData,
  // loadCapabilityTest,
})(Mine);
