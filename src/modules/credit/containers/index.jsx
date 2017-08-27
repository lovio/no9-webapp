import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCredits } from 'actions/user';
import { getCreditRecords } from '../actions';
import CreditView from '../components';

class Credit extends Component {
  static propTypes = {
    loadCredits: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadCredits();
  }

  render() {
    return <CreditView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    credit: state.getIn(['user', 'credits']),
    records: state.getIn(['credit', 'records']),
    pagination: state.getIn(['pagination', 'credits']),
  };
}

export default connect(mapStateToProps, {
  loadCredits,
  getCreditRecords,
})(Credit);
