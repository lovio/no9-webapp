import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import get from 'lodash-es/get';

import * as wxActions from '../actions/wx';
import * as actions from '../actions/user';
import * as orderActions from '../actions/order';
import initialState from './initialState';

export default combineReducers({
  openid: handleActions(
    {
      [wxActions.getOpenIDByCode]: () => '',
      [wxActions.openid.success]: (state, { payload }) => get(payload, 'openid'),
    },
    initialState.getIn(['mine', 'openid']),
  ),
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
      [orderActions.records.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['mine', 'records']),
  ),
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
