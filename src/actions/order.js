import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const loadCities = createAction('LOAD_CITIES');
export const cities = createFetchActions('ZCITIES');

export const triggerWechatPay = createAction('TRIGGER_WECHATPAY');
export const payment = createFetchActions('PAYMENT');
