import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch } from 'helpers/history';

import { DEFAULT_SORT } from 'constants/constants.json';
import { authorizedRedirect } from 'actions/common';
import { loadTiTopic } from '../actions';
import TiTopicsView from '../components/topic';


class TiTopic extends Component {
  static defaultProps = {
    questionTypeId: '',
  }
  static propTypes = {
    loadTiTopic: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
    tagId: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    questionTypeId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = DEFAULT_SORT;
  }

  componentDidMount() {
    const { subjectId, tagId, typeId, questionTypeId } = this.props;
    this.props.loadTiTopic({ subjectId, tagId, questionTypeId, typeId, ...this.state });
  }

  setSort = ({ sortType }) => {
    const newSort = { ...DEFAULT_SORT };
    newSort.sortType = sortType;
    if (sortType === this.state.sortType) {
      newSort.sortRule = this.state.sortRule === 'up' ? 'down' : 'up';
    }
    this.setState(newSort);
    const { subjectId, tagId, typeId, questionTypeId } = this.props;
    this.props.loadTiTopic({ subjectId, tagId, questionTypeId, typeId, ...newSort });
  }

  render() {
    return (
      <TiTopicsView
        setSort={this.setSort}
        {...this.props}
        {...this.state}
      />
    );
  }
}

const questionTypeIdSelector = createSelector(
  (state, props) => props.location.search,
  search => getSearch(search).questionTypeId,
);

const typeIdSelector = createSelector(
  (state, props) => props.location.search,
  search => getSearch(search).typeId,
);

function mapStateToProps(state, props) {
  return {
    questionTypeId: questionTypeIdSelector(state, props),
    typeId: typeIdSelector(state, props),
    subjectId: props.match.params.subjectId,
    tagId: props.match.params.tagId,
    topic: state.getIn(['ti', 'topic']),
  };
}

export default connect(mapStateToProps, {
  loadTiTopic,
  authorizedRedirect,
})(TiTopic);
