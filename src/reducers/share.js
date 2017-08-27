import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actions from 'actions/user';
import initialState from './initialState';

export default handleActions({
  [actions.loadShareInfo]: () => Immutable.Map(),
  [actions.shareInfo.success]: (state, { payload }) => Immutable.fromJS(payload),
}, initialState.get('share'));
