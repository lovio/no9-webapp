import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

import assign from 'lodash-es/assign';
import isString from 'lodash-es/isString';

export const clearPagination = createAction('CLEAR_PAGINATION');

export const hideToastItem = createAction('HIDE_TOAST_ITEM');

export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');
// 有必要，saga会在reducer改变后执行，我们是没有办法保证在saga中能获得改变之前的数据
export const clearModalData = createAction('CLEAR_MODAL_DATA');

export const showMedal = createAction('SHOW_MEDAL');
export const hideMedal = createAction('HIDE_MEDAL');

let toastId = 1;

// default toast is type: error
export const showToastItem = createAction('SHOW_TOAST_ITEM', (payload) => {
  const action = assign({ id: toastId }, isString(payload) ? {
    type: 'error',
    msg: payload,
  } : payload);
  toastId += 1;
  return action;
});

export const getConfig = createAction('GET_CONFIG');
export const realGetConfig = createFetchActions('REAL_GET_CONFIG');

export const getUser = createAction('GET_USER');
export const realGetUser = createFetchActions('REAL_GET_USER');

export const showConfirm = createAction('SHOW_CONFIRM');
export const hideConfirm = createAction('HIDE_CONFIRM');
export const handleConfirm = createAction('HANDLE_CONFIRM');

// redirect前检查token
export const authorizedRedirect = createAction('AUTHORIZED_REDIRECT');
