import { take, put, call, select, takeEvery } from 'redux-saga/effects';
import history from 'helpers/history';
import { isPhone } from 'helpers/validators';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/auth';
import * as apis from 'helpers/api';
import { getFormValuesByName } from './selector';
import { showToastItem, showConfirm } from '../actions/common';

import { formRequest, fetchEntity } from './utils';

const requestUserInfo = fetchEntity.bind(null, actions.userInfo, apis.getUserInfo);

function* sendCaptcha({ payload }) {
  // 1 从表单中获取手机号
  const { resolve, reject } = payload;
  const formName = history.location.pathname === '/signup' ? 'signUp' : 'resetPwd';
  const phone = yield select(getFormValuesByName(formName, 'phone'));
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
      { payload: { values, resolve, reject } }
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
  // const openid = yield select(state => state.getIn(['user', 'openid']));
  // yield put(actions.setBindInfo({ bindType }));
  const values = {
    ...payload.values,
    // openid,
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
    }
  );
}

export function* watchSignIn() {
  yield takeEvery(actions.signIn, signIn);
}

function* signUp({ payload }) {
  const { resolve, reject } = payload;
  // const openid = yield select(state => state.getIn(['user', 'openid']));
  // yield put(actions.setBindInfo({ bindType }));
  const values = {
    ...payload.values,
    // openid,
  };
  yield call(
    formRequest,
    {
      api: apis.signUp,
      actions: {
        success: actions.signUpSuccess,
      },
    },
    {
      payload: { values, resolve, reject },
    }
  );
}

export function* watchSignUp() {
  yield takeEvery(actions.signUp, signUp);
}

function* resetPwd({ payload }) {
  const { resolve, reject } = payload;
  // const openid = yield select(state => state.getIn(['user', 'openid']));
  // yield put(actions.setBindInfo({ bindType }));
  const values = {
    ...payload.values,
    // openid,
  };
  yield call(
    formRequest,
    {
      api: apis.resetPwd,
      actions: {
        success: actions.resetPwdSuccess,
      },
    },
    {
      payload: { values, resolve, reject },
    }
  );
}

export function* watchResetPwd() {
  yield takeEvery(actions.resetPwd, resetPwd);
}

export function* watchAuthSuccess() {
  for (;;) {
    const { payload } = yield take(actions.authSuccess);
    yield put(
      showToastItem({
        type: 'success',
        msg: '登录成功！',
      })
    );
    if (payload) {
      // yield call(redirect, HOME_PATH);
      history.push('/zones');
    }
  }
}

export function* watchSignUpSuccess() {
  for (;;) {
    yield take(actions.signUpSuccess);
    yield put(
      showToastItem({
        type: 'success',
        msg: '注册成功，请登录！',
      })
    );
    history.push({
      pathname: '/login',
      search: history.location.search,
    });
  }
}

export function* watchSignOut() {
  for (;;) {
    yield take(actions.signOut);
    history.push('/login');
  }
}

export function* watchResetPwdSuccess() {
  for (;;) {
    yield take(actions.resetPwdSuccess);
    yield put(
      showToastItem({
        type: 'success',
        msg: '密码重置成功，请重新登录！',
      })
    );
    history.push({
      pathname: '/login',
      search: history.location.search,
    });
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

export function* watchGetUserInfoSuccess() {
  for (;;) {
    const { payload } = yield take(actions.userInfo.success);
    if (history.location.pathname === '/mine/cards/new' && !payload.name) {
      yield put(
        showConfirm({
          type: 'profileIncomplete',
          desc: ['实名信息未完善，请先完善实名信息'],
        })
      );
    }
  }
}
