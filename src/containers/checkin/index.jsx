import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCheckin, doCheckin } from 'actions/user';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';

import CheckinView from 'components/checkin';

class Checkin extends Component {
  static propTypes = {
    loadCheckin: PropTypes.func.isRequired,
    doCheckin: PropTypes.func.isRequired,
    checkins: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      year: getYear(Date.now()),
      // month is zero-based
      month: getMonth(Date.now()),
    };
  }

  componentDidMount() {
    const { year, month } = this.state;
    this.props.doCheckin();
    this.props.loadCheckin({ year, month: month + 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const { year, month } = this.state;
    if (month !== prevState.month) {
      this.props.loadCheckin({ year, month: month + 1 });
    }
  }

  goToLastMonth = () => {
    let month;
    let year;
    if (this.state.month === 0) {
      year = this.state.year - 1;
      month = 11;
    } else {
      year = this.state.year;
      month = this.state.month - 1;
    }
    this.setState({ year, month });
  }

  goToNextMonth = () => {
    let month;
    let year;
    if (this.state.month === 11) {
      year = this.state.year + 1;
      month = 0;
    } else {
      year = this.state.year;
      month = this.state.month + 1;
    }
    this.setState({ year, month });
  }

  render() {
    return (
      <CheckinView
        goToNextMonth={this.goToNextMonth}
        goToLastMonth={this.goToLastMonth}
        checkins={this.props.checkins}
        year={this.state.year}
        month={this.state.month}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    checkins: state.getIn(['user', 'checkins']),
  };
}

export default connect(mapStateToProps, {
  loadCheckin,
  doCheckin,
})(Checkin);
