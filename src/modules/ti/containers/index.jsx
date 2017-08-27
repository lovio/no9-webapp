import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import pick from 'lodash-es/pick';
import find from 'lodash-es/find';
import { createSelector } from 'reselect';
import { tagList } from 'constants/tags.json';
import { authorizedRedirect } from 'actions/common';

import { loadExerciseCounts } from '../actions';
import TiView from '../components';

class Ti extends Component {
  static propTypes = {
    loadExerciseCounts: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { subjectId } = this.props;
    this.props.loadExerciseCounts({ subjectId });
  }

  render() {
    const props = pick(this.props, ['counts', 'subjectId', 'tags', 'authorizedRedirect']);
    return <TiView {...props} />;
  }
}

const tagsSelector = createSelector(
  (state, props) => +props.match.params.subjectId,
  (subjectId) => {
    const tags = find(tagList, tag => tag.subjectId === subjectId) || {};
    return Immutable.fromJS(tags.tags || []);
  },
);

function mapStateToProps(state, props) {
  return {
    counts: state.getIn(['ti', 'counts']),
    subjectId: props.match.params.subjectId,
    tags: tagsSelector(state, props),
  };
}

export default connect(mapStateToProps, {
  loadExerciseCounts,
  authorizedRedirect,
})(Ti);
