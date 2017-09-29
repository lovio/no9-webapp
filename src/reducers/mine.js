import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from '../actions/user';
import * as orderActions from '../actions/order';
import initialState from './initialState';

export default combineReducers({
  cards: handleActions(
    {
      [actions.loadCards]: () => Immutable.List(),
      [actions.cards.success]: (state, { payload }) => fromJS(payload),
      [actions.cardRemove.success]: (state, { meta: { id } }) =>
        state.filterNot(item => item.get('id') === id),
    },
    initialState.getIn(['mine', 'cards']),
  ),
  records: handleActions(
    {
      [orderActions.loadRecords]: () => Immutable.List(),
      [orderActions.records.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['mine', 'records']),
  ),
});
