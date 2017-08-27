import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setExamTime, loadIntention } from 'actions/user';
import { createSelector } from 'reselect';
import ExamTimeView from 'components/user/examTime';
import getTime from 'date-fns/get_time';

class ExamTime extends Component {
  static propTypes = {
    loadIntention: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadIntention();
  }

  render() {
    return <ExamTimeView {...this.props} />;
  }
}

const initialValuesSelector = createSelector(
  state => state.getIn(['user', 'intention']),
  (intention) => {
    const date = intention.get('date');
    return {
      examTime: date ? getTime(date) / 1000 : '',
      targetScore: intention.get('plan') || '',
      isExamined: intention.get('isExamined') || '',
    };
  },
);

function mapStateToProps(state) {
  return {
    initialValues: initialValuesSelector(state),
  };
}

export default connect(mapStateToProps, { loadIntention, setExamTime })(ExamTime);
