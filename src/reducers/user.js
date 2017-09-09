import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from 'actions/auth';
import initialState from './initialState';

export default handleActions(
  {
    [actions.authSuccess]: (state, { payload }) => fromJS(payload),
    [actions.signOut]: () => Immutable.Map(),
  },
  initialState.getIn(['user']),
);
