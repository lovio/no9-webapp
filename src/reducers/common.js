import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from '../actions/common';
import initialState from './initialState';

export default combineReducers({
  toasts: handleActions(
    {
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
    },
    initialState.getIn(['common', 'toasts'])
  ),
  modal: handleActions(
    {
      [actions.showModal]: (state, { payload }) => Immutable.fromJS(payload),
      [actions.clearModalData]: () => Immutable.Map(),
    },
    initialState.getIn(['common', 'modal'])
  ),
  confirm: handleActions(
    {
      [actions.showConfirm]: (state, { payload }) => Immutable.fromJS(payload),
      [actions.hideConfirm]: () => Immutable.Map(),
    },
    initialState.getIn(['common', 'confirm'])
  ),
});
