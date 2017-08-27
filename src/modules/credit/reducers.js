import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from 'reducers/initialState';
import * as actions from './actions';

export default combineReducers({
  // 积分列表
  records: handleActions({
    [actions.getCreditRecords]: (state, { payload }) => {
      if (payload.page === 1) {
        return Immutable.List();
      }
      return state;
    },
    [actions.realGetCreditRecords.success]: (state, { payload }) =>
      state.concat(Immutable.fromJS(payload.pointActions)),
  }, initialState.getIn(['credit', 'records'])),
});
