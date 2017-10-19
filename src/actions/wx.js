import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const transferCode = createAction('TRANSFER_CODE');
export const initWechat = createAction('INIT_WECHAT');

export const getOpenIDByCode = createAction('GET_OPEN_I_D_BY_CODE');
export const openid = createFetchActions('OPENID');
