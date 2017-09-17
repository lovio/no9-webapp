import { take, put, call, select, takeEvery } from 'redux-saga/effects';
import history, { redirect } from 'helpers/history';
import { isPhone } from 'helpers/validators';

import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/auth';
import * as apis from 'helpers/api';
import { getFormValuesByName } from './selector';
import { showToastItem } from '../actions/common';
import { formRequest, fetchEntity } from './utils';

const requestUserInfo = fetchEntity.bind(null, actions.userInfo, apis.getUserInfo);

function* sendCaptcha({ payload }) {
  // 1 从表单中获取手机号
  const { resolve, reject } = payload;
  const phone = yield select(getFormValuesByName('signIn', 'phone'));
  const tip = !phone ? '请输入手机号' : isPhone('请输入正确的手机号')(phone);
  if (tip) {
    yield put(showToastItem(tip));
    reject();
  } else {
    const values = {
      phone,
    };
    yield call(
      formRequest,
      {
        api: apis.sendPhoneCaptcha,
        actions: {
          failure: actions.sendCaptchaError,
        },
      },
      { payload: { values, resolve, reject } },
    );
  }
}

export function* watchSendCaptcha() {
  yield takeEvery(actions.sendCaptcha, sendCaptcha);
}

export function* watchSendCaptchaError() {
  for (;;) {
    const { payload: { msg } } = yield take(actions.sendCaptchaError);
    yield put(showToastItem(msg));
  }
}

function* signIn({ payload }) {
  const { resolve, reject } = payload;
  const openid = yield select(state => state.getIn(['user', 'openid']));
  // yield put(actions.setBindInfo({ bindType }));
  const values = {
    ...payload.values,
    openid,
  };
  yield call(
    formRequest,
    {
      api: apis.signIn,
      actions: {
        success: actions.authSuccess,
      },
    },
    {
      payload: { values, resolve, reject },
    },
  );
}

export function* watchSignIn() {
  yield takeEvery(actions.signIn, signIn);
}

export function* watchAuthSuccess() {
  for (;;) {
    const { payload } = yield take(actions.authSuccess);
    if (payload) {
      yield call(redirect, HOME_PATH);
    }
  }
}

// checkAuth 要支持外地跳转进来的，以及跳转到oauth
export function* watchCheckAuth() {
  for (;;) {
    yield take(actions.checkAuth);
    const token = yield select(state => state.getIn(['user', 'token']));
    if (!token) {
      const { pathname, search } = history.location;
      const redirectUrl = encodeURIComponent(`${pathname}${search}`);
      history.replace(`/login?redirectUrl=${redirectUrl}`);
    }
  }
}

// 获取用户信息
function* loadUserInfo({ payload }) {
  yield call(requestUserInfo, payload || {}, true);
}

export function* watchGetUserInfo() {
  yield takeEvery(actions.getUserInfo, loadUserInfo);
}
