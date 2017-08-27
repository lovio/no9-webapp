import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import { createDataReducer } from 'reducers/utils';
import * as actions from './actions';

export default combineReducers({
  records: createDataReducer({
    loadAction: actions.loadStudyRecords,
    fetchTypes: actions.studyRecords,
    initialStatePosition: ['study', 'records'],
    loadFunc: (state, { payload }) => state.set(payload.date, Immutable.List()),
    successFunc: (state, { payload, meta }) =>
      state.set(meta.date, Immutable.fromJS(payload.exerciseList)),
  }),
});
