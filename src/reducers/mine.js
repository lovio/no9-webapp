import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from '../actions/user';
import initialState from './initialState';

export default combineReducers({
  cards: handleActions(
    {
      [actions.loadCards]: () => Immutable.List(),
      [actions.cards.success]: (state, { payload }) => fromJS(payload),
      // [actions.removeCardSuccess]: ()
      // [actions.addNewCardSuccess]: ()
    },
    initialState.getIn(['mine', 'cards']),
  ),
});
