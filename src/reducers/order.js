import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from '../actions/order';
import initialState from './initialState';

export default combineReducers({
  data: handleActions(
    {
      [actions.loadOrder]: () => Immutable.Map(),
      [actions.order.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['order', 'data'])
  ),
  isLoading: handleActions(
    {
      [actions.order.request]: () => true,
      [actions.order.success]: () => false,
      [actions.order.failure]: () => false,
    },
    initialState.getIn(['order', 'isLoading'])
  ),
});
