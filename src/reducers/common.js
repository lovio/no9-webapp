import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from '../actions/common';
import initialState from './initialState';

export default combineReducers({
  toasts: handleActions({
    [actions.showToastItem]: (state, { payload }) => {
      if (payload.msg && payload.id) {
        if (state.size) {
          return state;
        }
        return state.set(payload.id, Immutable.Map(payload));
      }
      return state;
    },
    [actions.hideToastItem]: (state, { payload }) => state.delete(payload),
  }, initialState.getIn(['common', 'toasts'])),
  modal: handleActions({
    [actions.showModal]: (state, { payload }) => Immutable.fromJS(payload),
    [actions.clearModalData]: () => Immutable.Map(),
  }, initialState.getIn(['common', 'modal'])),
  confirm: handleActions({
    [actions.showConfirm]: (state, { payload }) => Immutable.fromJS(payload),
    [actions.hideConfirm]: () => Immutable.Map(),
  }, initialState.getIn(['common', 'confirm'])),

  // 配置项
  config: handleActions({
    [actions.getConfig]: () => ({ status: 'LOADING' }),
    [actions.realGetConfig.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetConfig.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['common', 'config'])),

  // 用户信息
  user: handleActions({
    [actions.getUser]: () => ({ status: 'LOADING' }),
    [actions.realGetUser.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetUser.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['common', 'user'])),

  // 勋章
  medal: handleActions({
    [actions.showMedal]: (state, { payload }) => Immutable.fromJS(payload),
    [actions.hideMedal]: () => Immutable.Map(),
  }, initialState.getIn(['common', 'modal'])),
});
