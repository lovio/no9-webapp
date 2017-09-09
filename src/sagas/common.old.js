import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import get from 'lodash-es/get';
import includes from 'lodash-es/includes';
import some from 'lodash-es/some';
import history, { getSearch } from 'helpers/history';
import omit from 'lodash-es/omit';
import qs from 'qs';

import { tokenFailure } from 'actions/auth';
import { clearUserInfo } from 'actions/user';
// import { transferCode } from 'actions/wx';
import * as commonActions from 'actions/common';
import { ToastMsgTimeout } from 'constants/constants.json';
import { fetchEntity } from './utils';
import * as apis from '../helpers/api';

// 获取配置项
export function* watchGetConfig() {
  for (;;) {
    const { payload } = yield take(commonActions.getConfig);
    yield call(fetchEntity, commonActions.realGetConfig, apis.getConfig, payload, true);
  }
}

// 获取用户信息
export function* watchGetUser() {
  for (;;) {
    const { payload } = yield take(commonActions.getUser);
    yield call(fetchEntity, commonActions.realGetUser, apis.getUser, payload, true);
  }
}

// 如果要限制某一类的错误，要提取专门的anction，然后使用throttle;
function* hideToastItem(id) {
  yield call(delay, ToastMsgTimeout);
  yield put(commonActions.hideToastItem(id));
}

export function* watchShowToastItem() {
  for (;;) {
    const { payload } = yield take(commonActions.showToastItem);
    yield fork(hideToastItem, payload.id);
  }
}

function* handleShowModal({ payload: { willHide } }) {
  if (willHide) {
    yield call(delay, ToastMsgTimeout);
    yield put(commonActions.hideModal());
  }
}

function* handleHideModal() {
  const next = yield select(state => state.getIn(['common', 'modal', 'next']));
  if (next) {
    if (next.get('type') === 'medal') {
      yield put(commonActions.showMedal({ id: next.get('id') }));
    }
  }
  yield put(commonActions.clearModalData());
}

export function* watchShowModal() {
  yield takeEvery(commonActions.showModal, handleShowModal);
}

export function* watchHideModal() {
  yield takeEvery(commonActions.hideModal, handleHideModal);
}

const TOAST_BLACK_LIST = [
  'ANSWER_COUNT',
  'CREDITS',
  'INTENTION',
  'CHECKIN',
  'CHECK_ACCOUNT',
  'LOAD_LATELY_EXERCISE',
  'MEIQIA_STATS',
];

export function* watchFailure() {
  for (;;) {
    const { type, payload } = yield take(action => includes(action.type, 'FAILURE'));
    if (!some(TOAST_BLACK_LIST, entity => includes(type, entity))) {
      const msg = payload ? get(payload, 'data.msg') : '出错啦';
      yield put(commonActions.showToastItem({ type: 'error', msg }));
    }

    if (payload && get(payload, 'data.code') === 10) {
      // token失效，让用户transfer
      const { pathname, search } = history.location;
      yield put(tokenFailure());
      yield put(clearUserInfo());
      if (!includes(['/', '/signin'], pathname)) {
        const newSearch = omit(getSearch(search), ['redirectUrl']);
        const redirectUrl = encodeURIComponent(`${pathname}?${qs.stringify(newSearch)}`);
        history.replace(`/signin?redirectUrl=${redirectUrl}`);
      }
      // 未来要考虑code失效是否重新获取认证
      // yield put(transferCode());
    }
  }
}

export function* watchHandleConfirm() {
  for (;;) {
    yield take(commonActions.handleConfirm);
    const code = yield select(state => state.getIn(['common', 'confirm', 'code']));
    if (includes(['USER_10106', 'USER_10101'], code)) {
      yield put(commonActions.hideConfirm());
      history.push({
        pathname: '/bind/account',
        search: history.location.search,
      });
    } else if (code === 10301) {
      yield put(commonActions.hideConfirm());
      history.push({
        pathname: '/bind/unbind',
        search: history.location.search,
      });
    }
  }
}

export function* watchAuthorizedRedirect() {
  for (;;) {
    const { payload } = yield take(commonActions.authorizedRedirect);
    const token = yield select(state => state.getIn(['user', 'info', 'token']));
    if (token) {
      location.assign(payload);
    } else {
      history.push({
        pathname: '/bind',
        search: `?redirectUrl=${payload}`,
      });
    }
  }
}

// 显示勋章
export function* watchShowMedal() {
  for (;;) {
    const { payload } = yield take(commonActions.showMedal);
    if (payload.timeout) {
      yield call(delay, payload.timeout * 1000);
      yield put(commonActions.hideMedal());
    }
  }
}
