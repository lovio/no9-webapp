import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const loadCities = createAction('LOAD_CITIES');
export const cities = createFetchActions('ZCITIES');

export const loadZones = createAction('LOAD_ZONES');
export const zones = createFetchActions('ZONES');
