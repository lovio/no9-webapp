import { takeEvery } from 'redux-saga/effects';
// import history, { redirect } from 'helpers/history';
// import { isPhone } from 'helpers/validators';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/extra';
import * as apis from 'helpers/api';
// import { getFormValuesByName } from './selector';
// import { showToastItem } from '../actions/common';
import { fetchEntity } from './utils';

const requestZones = fetchEntity.bind(null, actions.zones, apis.getZones, {});

const requestCities = fetchEntity.bind(null, actions.cities, apis.getCities, {});
const requestCarports = fetchEntity.bind(null, actions.carports, apis.getCarports, {}, true);

export function* watchLoadZones() {
  yield takeEvery(actions.loadZones, requestZones);
}

export function* watchLoadCities() {
  yield takeEvery(actions.loadCities, requestCities);
}

export function* watchLoadCarports() {
  yield takeEvery(actions.loadCarports, requestCarports);
}
