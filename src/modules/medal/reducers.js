import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from 'reducers/initialState';
import * as actions from './actions';

export default combineReducers({
  // 获取勋章列表
  medals: handleActions({
    [actions.getMedals]: () => ({ status: 'LOADING' }),
    [actions.realGetMedals.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetMedals.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['medal', 'medals'])),
});
