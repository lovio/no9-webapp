import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

// 获取积分记录
export const getCreditRecords = createAction('GET_CREDIT_RECORDS');
export const realGetCreditRecords = createFetchActions('REAL_GET_CREDIT_RECORDS');
