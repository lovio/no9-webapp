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
  card: handleActions(
    {
      [actions.chooseCard]: (state, { payload }) => payload,
      [actions.withdrawSuccess]: () => initialState.getIn(['mine', 'card']),
    },
    initialState.getIn(['mine', 'card']),
  ),
  records: handleActions(
    {
      [orderActions.loadRecords]: () => Immutable.List(),
      [orderActions.records.success]: (state, { payload }) => state.concat(fromJS(payload)),
    },
    initialState.getIn(['mine', 'records']),
  ),
  orders: handleActions(
    {
      [orderActions.loadOrders]: () => Immutable.List(),
      [orderActions.orders.success]: (state, { payload }) => state.concat(fromJS(payload)),
    },
    initialState.getIn(['mine', 'orders']),
  ),
  summries: combineReducers({
    data: handleActions(
      {
        [actions.loadDailySummaries]: () => Immutable.List(),
        [actions.dailySummaries.success]: (state, { payload }) => state.concat(fromJS(payload)),
      },
      initialState.getIn(['mine', 'summries', 'data']),
    ),
    isLoading: handleActions(
      {
        [actions.dailySummaries.request]: () => true,
        [actions.dailySummaries.success]: () => false,
        [actions.dailySummaries.failure]: () => false,
      },
      initialState.getIn(['mine', 'summries', 'isLoading']),
    ),
  }),
  relations: combineReducers({
    data: handleActions(
      {
        [actions.loadRelations]: () => Immutable.Map(),
        [actions.relations.success]: (state, { payload }) => fromJS(payload),
      },
      initialState.getIn(['mine', 'relations', 'data']),
    ),
    isLoading: handleActions(
      {
        [actions.relations.request]: () => true,
        [actions.relations.success]: () => false,
        [actions.relations.failure]: () => false,
      },
      initialState.getIn(['mine', 'relations', 'isLoading']),
    ),
  }),
});
