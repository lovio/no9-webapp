import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

// 获取勋章列表
export const getMedals = createAction('GET_MEDALS');
export const realGetMedals = createFetchActions('REAL_GET_MEDALS');
