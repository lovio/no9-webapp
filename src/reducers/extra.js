import { combineReducers } from 'redux-immutable';
import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import get from 'lodash-es/get';

import * as actions from 'actions/extra';
import * as userActions from 'actions/user';
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
  grade: handleActions(
    {
      [userActions.loadGrade]: () => '',
      [userActions.loadGradeSuccess]: (state, { payload }) => {
        console.log(payload);
        return get(payload, 'response.grade') || '？？';
      },
    },
    initialState.getIn(['extra', 'grade'])
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
