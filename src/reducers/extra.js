import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from 'actions/order';
import initialState from './initialState';

export default combineReducers({
  cities: handleActions(
    {
      [actions.loadCities]: () => Immutable.List(),
      [actions.cities.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['extra', 'cities']),
  ),
});
