import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import get from 'lodash-es/get';
import pick from 'lodash-es/pick';

import * as actions from 'actions/auth';
import * as userActions from 'actions/user';
import initialState from './initialState';
import { createDataReducer } from './utils';

// userinfo数据太乱，统一
function cleanInfo(userInfo) {
  return pick(userInfo, [
    'avatar', 'userId', 'token', 'unionId', 'nickname', 'isAuthorized', 'isBound', 'phone',
  ]);
}

export default combineReducers({
  info: handleActions({
    [actions.wechatBindStatus.success]: (state, { payload }) => fromJS(cleanInfo(payload)),
    [actions.registerToken]: (state, { payload }) => state.merge(fromJS(payload)),
    // [actions.wechatBind.success]: (state, { payload }) => state.merge(Immutable.fromJS(payload)),
    [actions.authSuccess]: (state, { payload }) => state.merge(fromJS(cleanInfo(payload))),
    [actions.bindAccountSuccess]: (state, { payload }) => state.merge(fromJS(cleanInfo(payload))),
    [userActions.userInfo.success]: (state, { payload }) => state.merge(fromJS(cleanInfo(payload))),
    [userActions.changeNameSuccess]: (state, { payload }) => state.set('nickname', payload),
    [userActions.loadWechatImage]: (state, { payload }) => {
      if (payload) {
        return state.set('avatar', payload);
      }
      return state;
    },
    // 留一个unionId
    [userActions.clearUserInfo]: state => Immutable.Map({ unionId: state.get('unionId') }),
    [actions.tokenFailure]: () => Immutable.Map(),
  }, initialState.getIn(['user', 'info'])),
  credits: handleActions({
    [userActions.credits.success]: (state, { payload }) => get(payload, 'point') || initialState.getIn(['user', 'credits']),
  }, initialState.getIn(['user', 'credits'])),
  intention: handleActions({
    [userActions.intention.success]: (state, { payload }) => Immutable.fromJS(payload || {}),
  }, initialState.getIn(['user', 'intention'])),
  checkin: handleActions({
    [userActions.checkin.success]: (state, { payload, meta }) => {
      if (isEmpty(meta)) {
        return Immutable.fromJS(payload || {});
      }
      return state;
    },
  }, initialState.getIn(['user', 'checkin'])),
  checkins: handleActions({
    [userActions.checkin.success]: (state, { payload, meta }) => {
      if (!isEmpty(meta)) {
        const days = map(payload.data, day => `${day.year}-${day.month}-${day.day}`);
        return state.union(Immutable.Set(days));
      }
      return state;
    },
  }, Immutable.Set()),
  answerCount: handleActions({
    [userActions.answerCount.success]: (state, { payload }) =>
      Immutable.fromJS(get(payload, 'count') || initialState.getIn(['user', 'answerCount'])),
  }, initialState.getIn(['user', 'answerCount'])),
  abroadPlan: handleActions({
    // [userActions.loadAbroadPlan]: () => Immutable.Map(),
    [userActions.abroadPlan.success]: (state, { payload }) => Immutable.fromJS(payload || {}),
  }, initialState.getIn(['user', 'abroadPlan'])),
  capabilityTest: createDataReducer({
    loadAction: userActions.loadCapabilityTest,
    fetchTypes: userActions.capabilityTest,
    initialStatePosition: ['user', 'capabilityTest'],
    loadFunc: state => state,
  }),
  bind: handleActions({
    [actions.checkAccount]: (state, { payload: { values } }) => Immutable.fromJS(values),
    [actions.setBindInfo]: (state, { payload }) => state.merge(Immutable.fromJS(payload)),
  }, initialState.getIn(['user', 'bind'])),
  unbind: handleActions({
    [actions.setUnbindInfo]: (state, { payload }) => Immutable.fromJS(payload),
    [actions.accountUnbind.request]: state => state.merge({ status: 'request' }),
    [actions.accountUnbind.success]: state => state.merge({ status: 'success' }),
    [actions.accountUnbind.failure]: state => state.merge({ status: 'failure' }),
    [actions.bindAccountSuccess]: () => Immutable.Map(),
  }, initialState.getIn(['user', 'unbind'])),
});
