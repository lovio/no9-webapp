import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import get from 'lodash-es/get';

import initialState from 'reducers/initialState';
import { createDataReducer } from 'reducers/utils';

import * as actions from './actions';

export default combineReducers({
  counts: handleActions({
    [actions.loadExerciseCounts]: () => Immutable.Map(),
    [actions.exerciseCounts.success]: (state, { payload }) => {
      const questionPackageCount = get(payload, 'questionPackageData.count');
      const questionTypeCount = get(payload, 'questionTypeData.count');
      const topicCount = get(payload, 'topicData.count');
      return Immutable.Map({
        questionPackageCount,
        questionTypeCount,
        topicCount,
      });
    },
  }, initialState.getIn(['ti', 'counts'])),
  tabs: handleActions({
    [actions.loadExerciseMenu]: () => Immutable.List(),
    [actions.exerciseMenu.success]: (state, { payload }) => Immutable.fromJS(payload),
  }, initialState.getIn(['ti', 'tabs'])),
  questionPackages: createDataReducer({
    loadAction: actions.loadExerciseQuestionPackage,
    fetchTypes: actions.exerciseQuestionPackage,
    initialStatePosition: ['ti', 'questionPackages'],
    loadFunc: () => Immutable.List(),
    successFunc: (state, { payload }) =>
      Immutable.fromJS(get(payload, 'questionPackageList.list')),
  }),
  topics: createDataReducer({
    loadAction: actions.loadTiTopics,
    fetchTypes: actions.tiTopics,
    initialStatePosition: ['ti', 'topics'],
    loadFunc: () => Immutable.List(),
  }),
  topic: createDataReducer({
    loadAction: actions.loadTiTopic,
    fetchTypes: actions.tiTopic,
    initialStatePosition: ['ti', 'topic'],
  }),
  lately: createDataReducer({
    loadAction: actions.loadLatelyExercise,
    fetchTypes: actions.latelyExercise,
    initialStatePosition: ['ti', 'lately'],
  }),
});
