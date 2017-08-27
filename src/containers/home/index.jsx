import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserData, loadCapabilityTest, loadUserInfo } from 'actions/user';
import { loadLatelyExercise } from 'modules/ti/actions';
import { authorizedRedirect } from 'actions/common';

import HomeView from 'components/home';

class Home extends Component {
  static propTypes = {
    loadUserData: PropTypes.func.isRequired,
    loadUserInfo: PropTypes.func.isRequired,
    loadCapabilityTest: PropTypes.func.isRequired,
    loadLatelyExercise: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadUserData();
    if (this.props.user.getIn(['info', 'token'])) {
      this.props.loadUserInfo();
      this.props.loadCapabilityTest();
      this.props.loadLatelyExercise();
    }
  }

  render() {
    return <HomeView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    latelyExercise: state.getIn(['ti', 'lately']),
  };
}

export default connect(mapStateToProps, {
  loadUserData,
  loadUserInfo,
  loadCapabilityTest,
  loadLatelyExercise,
  authorizedRedirect,
})(Home);
