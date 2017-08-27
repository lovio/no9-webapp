import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import format from 'date-fns/format';
import { getSearch } from 'helpers/history';

import { loadStudyRecords } from '../actions';
import StudyView from '../components';

class Study extends Component {
  static propTypes = {
    loadStudyRecords: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { date, type } = this.props;
    if (type === 'records') {
      this.props.loadStudyRecords({ date });
    }
  }

  componentDidUpdate(prevProps) {
    const { date, type } = this.props;
    if (type === 'records') {
      if (type !== prevProps.type) {
        this.props.loadStudyRecords({ date });
      } else if (date !== prevProps.date) {
        this.props.loadStudyRecords({ date });
      }
    }
  }

  render() {
    return <StudyView {...this.props} />;
  }
}

const dateSelector = createSelector(
  (state, props) => props.location.search,
  search => getSearch(search).date,
);

function mapStateToProps(state, props) {
  return {
    type: props.match.params.type,
    date: dateSelector(state, props) || format(Date.now(), 'YYYY-MM-DD'),
    study: state.get('study'),
  };
}

export default connect(mapStateToProps, {
  loadStudyRecords,
})(Study);
