import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAbroadPlan, loadAbroadPlan } from 'actions/user';
import { createSelector } from 'reselect';
import AbroadPlanView from 'components/user/abroadPlan';
import getTime from 'date-fns/get_time';

class AbroadPlan extends Component {
  static propTypes = {
    loadAbroadPlan: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadAbroadPlan();
  }

  render() {
    return <AbroadPlanView {...this.props} />;
  }
}

const initialValuesSelector = createSelector(
  state => state.get('user'),
  (user) => {
    const date = user.getIn(['abroadPlan', 'date']);
    return {
      phone: user.getIn(['abroadPlan', 'phone']) || user.getIn(['info', 'phone']) || '',
      date: date ? getTime(date) : '',
      country: user.getIn(['abroadPlan', 'country']),
      grade: user.getIn(['abroadPlan', 'grade']),
    };
  },
);

function mapStateToProps(state) {
  return {
    initialValues: initialValuesSelector(state),
    abroadPlan: state.getIn(['user', 'abroadPlan']),
  };
}

export default connect(mapStateToProps, { uploadAbroadPlan, loadAbroadPlan })(AbroadPlan);
