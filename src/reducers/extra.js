import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from 'actions/extra';
import initialState from './initialState';

export default combineReducers({
  cities: handleActions(
    {
      [actions.loadCities]: () => Immutable.List(),
      [actions.cities.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['extra', 'cities'])
  ),
  zones: handleActions(
    {
      [actions.loadZones]: () => Immutable.List(),
      [actions.zones.success]: (state, { payload }) => fromJS(payload),
    },
    initialState.getIn(['extra', 'zones'])
  ),
  carports: combineReducers({
    data: handleActions(
      {
        [actions.loadCarports]: () => Immutable.List(),
        [actions.carports.success]: (state, { payload }) => fromJS(payload),
      },
      initialState.getIn(['extra', 'carports', 'data'])
    ),
    isLoading: handleActions(
      {
        [actions.carports.request]: () => true,
        [actions.carports.success]: () => false,
        [actions.carports.failure]: () => false,
      },
      initialState.getIn(['extra', 'carports', 'isLoading'])
    ),
  }),
});
