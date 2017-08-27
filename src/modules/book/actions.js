import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

// 获取图书
export const getBook = createAction('GET_BOOK');
export const realGetBook = createFetchActions('REAL_GET_BOOK');

// 获取图书列表
export const getBooks = createAction('GET_BOOKS');
export const realGetBooks = createFetchActions('REAL_GET_BOOKS');

// 提交兑换信息
export const postExchange = createAction('POST_EXCHANGE');
export const realPostExchange = createFetchActions('REAL_POST_EXCHANGE');

// 获取分享图片
export const getShareImage = createAction('GET_SHARE_IMAGE');
export const realGetShareImage = createFetchActions('REAL_GET_SHARE_IMAGE');

// 提交邀请信息
export const postInvitation = createAction('POST_INVITATION');
export const realPostInvitation = createFetchActions('REAL_POST_INVITATION');
