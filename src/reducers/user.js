import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import toPairs from 'lodash-es/toPairs';

import * as actions from 'actions/auth';
import * as userActions from 'actions/user';
import initialState from './initialState';

export default handleActions(
  {
    [actions.authSuccess]: (state, { payload }) => fromJS(payload),
    [actions.signOut]: () => Immutable.Map(),
    [actions.userInfo.success]: (state, { payload }) => state.merge(fromJS(payload)),
    [actions.userInfo.failure]: () => Immutable.Map(),
    [userActions.updateProfileSuccess]: (state, { payload: { params } }) => {
      const data = toPairs(params);
      return state.set(...data[0]);
    },
  },
  initialState.getIn(['user']),
);
