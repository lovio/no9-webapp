import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import toPairs from 'lodash-es/toPairs';
import get from 'lodash-es/get';

import * as actions from 'actions/auth';
import * as userActions from 'actions/user';
import * as wxActions from '../actions/wx';

import initialState from './initialState';

export default handleActions(
  {
    [actions.authSuccess]: (state, { payload: { response } }) => state.merge(fromJS(response)),
    [actions.signOut]: () => Immutable.Map(),
    [actions.userInfo.success]: (state, { payload }) => state.merge(fromJS(payload)),
    [actions.userInfo.failure]: state => Immutable.Map({ openid: state.get('openid') }),
    [userActions.updateProfileSuccess]: (state, { payload: { params } }) => {
      const data = toPairs(params);
      return state.set(...data[0]);
    },
    [wxActions.getOpenIDByCode]: state => state.set('openid', ''),
    [wxActions.openid.success]: (state, { payload }) => state.set('openid', get(payload, 'openid')),
  },
  initialState.getIn(['user'])
);
