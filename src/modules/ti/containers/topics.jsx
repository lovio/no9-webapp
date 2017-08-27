import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { getSearch } from 'helpers/history';

import { loadTiTopics } from '../actions';
import TiTopicsView from '../components/topics';

// 话题是1 题型2
const TYPES = {
  TOPICS: '1',
  TYPES: '2',
};

class TiTopics extends Component {
  static propTypes = {
    loadTiTopics: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { subjectId, type } = this.props;
    this.props.loadTiTopics({ subjectId, type });
  }

  render() {
    return (
      <TiTopicsView {...this.props} />
    );
  }
}

const typeSelector = createSelector(
  (state, props) => props.location.search,
  // 默认是话题
  search => getSearch(search).type || TYPES.TOPICS,
);

function mapStateToProps(state, props) {
  return {
    type: typeSelector(state, props),
    subjectId: props.match.params.subjectId,
    topics: state.getIn(['ti', 'topics']),
  };
}

export default connect(mapStateToProps, {
  loadTiTopics,
})(TiTopics);
