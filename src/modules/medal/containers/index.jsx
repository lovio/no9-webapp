import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMedals } from '../actions';
import MedalView from '../components';

class Medal extends Component {
  static propTypes = {
    getMedals: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMedals();
  }

  render() {
    return <MedalView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.getIn(['user', 'info']),
    medals: state.getIn(['medal', 'medals']),
  };
}

export default connect(mapStateToProps, {
  getMedals,
})(Medal);
