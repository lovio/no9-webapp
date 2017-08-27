import { call, take } from 'redux-saga/effects';

import * as apis from 'helpers/api';
import { fetchEntity } from 'sagas/utils';
import * as actions from './actions';

// 获取图书
export function* watchGetBook() {
  for (;;) {
    const { payload } = yield take(actions.getBook);
    yield call(fetchEntity, actions.realGetBook, apis.getBook, payload, true);
  }
}

// 获取图书列表
export function* watchGetBooks() {
  for (;;) {
    yield take(actions.getBooks);
    yield call(fetchEntity, actions.realGetBooks, apis.getBooks, {}, true);
  }
}

// 提交兑换信息
export function* watchPostExchange() {
  for (;;) {
    const { payload } = yield take(actions.postExchange);
    yield call(fetchEntity, actions.realPostExchange, apis.postExchange, payload, true);
  }
}

// 获取分享图片
export function* watchGetShareImage() {
  for (;;) {
    const { payload } = yield take(actions.getShareImage);
    yield call(fetchEntity, actions.realGetShareImage, apis.getShareImage, payload, true);
  }
}

// 提交兑换信息
export function* watchPostInvitation() {
  for (;;) {
    const { payload } = yield take(actions.postInvitation);
    yield call(fetchEntity, actions.realPostInvitation, apis.postInvitation, payload, true);
  }
}
