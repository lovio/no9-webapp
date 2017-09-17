import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const loadCities = createAction('LOAD_CITIES');
export const cities = createFetchActions('ZCITIES');

export const createNewOrder = createAction('CREATE_NEW_ORDER');
export const newOrder = createFetchActions('NEW_ORDER');

export const triggerWechatPay = createAction('TRIGGER_WECHATPAY');
export const payment = createFetchActions('PAYMENT');
