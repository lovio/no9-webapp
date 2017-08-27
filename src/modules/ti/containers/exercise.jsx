import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import omit from 'lodash-es/omit';

import { getSearch } from 'helpers/history';
import { DEFAULT_SORT } from 'constants/constants.json';

import { authorizedRedirect } from 'actions/common';
import { loadExerciseMenu, loadExerciseQuestionPackage } from '../actions';
import TiExerciseView from '../components/exercise';

class TiExercise extends Component {
  static defaultProps = {
    textbookId: '',
    packageId: '',
  }
  static propTypes = {
    loadExerciseMenu: PropTypes.func.isRequired,
    loadExerciseQuestionPackage: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
    packageId: PropTypes.string.isRequired,
    textbookId: PropTypes.string,
    ti: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // 用来控制滚动到那一道题目的
      packageId: props.packageId,
      isScrolled: false,
      ...DEFAULT_SORT,
    };
  }


  componentDidMount() {
    const { subjectId, textbookId } = this.props;
    this.props.loadExerciseMenu({ subjectId });
    if (textbookId) {
      const { sortRule, sortType } = this.state;
      this.props.loadExerciseQuestionPackage({ subjectId, textbookId, sortRule, sortType });
    }
  }

  componentDidUpdate(prevProps) {
    const { textbookId, packageId, ti } = this.props;
    if (prevProps.textbookId !== textbookId) {
      this.setSort({});
      this.choosePackage(packageId);
    } else if (prevProps.packageId !== packageId) {
      this.choosePackage(packageId);
    }

    if (!this.state.isScrolled && !ti.getIn(['questionPackages', 'data']).size) {
      /* eslint-disable react/no-did-update-set-state */
      // todo
      // i have to do this before I find a better solution for scrolling.
      this.setState(prevState => ({
        isScrolled: !prevState.isScrolled,
      }), () => {
        setTimeout(() => {
          const element = document.getElementById(packageId);
          if (element) {
            element.scrollIntoView();
          }
        }, 500);
      });
    }
  }

  setSort = ({ sortType }) => {
    const newSort = { ...DEFAULT_SORT };
    if (sortType) {
      newSort.sortType = sortType;
      if (sortType === this.state.sortType) {
        newSort.sortRule = this.state.sortRule === 'up' ? 'down' : 'up';
      }
      this.setState(newSort);
    }
    const { subjectId, textbookId } = this.props;
    this.props.loadExerciseQuestionPackage({ subjectId, textbookId, ...newSort });
  }

  // 其实做了两件事情。
  // tab的切换时通过跳转来实现的，跳转之后应该讲sort都初始化，这里通过choosePackage来简化操作
  // 这个东西不是一个地方用。。。打开一个练习也会用到
  choosePackage = packageId => this.setState({ packageId })

  render() {
    return (
      <TiExerciseView
        choosePackage={this.choosePackage}
        setSort={this.setSort}
        {...this.state}
        {...omit(this.props, ['packageId'])}
      />
    );
  }
}

const textbookIdSelector = createSelector(
  (state, props) => props.location.search,
  search => getSearch(search).textbookId,
);

const packageIdSelector = createSelector(
  (state, props) => props.location.search,
  search => getSearch(search).packageId,
);

function mapStateToProps(state, props) {
  return {
    textbookId: textbookIdSelector(state, props),
    packageId: packageIdSelector(state, props),
    subjectId: props.match.params.subjectId,
    ti: state.get('ti'),
  };
}

export default connect(mapStateToProps, {
  loadExerciseMenu,
  loadExerciseQuestionPackage,
  authorizedRedirect,
})(TiExercise);
