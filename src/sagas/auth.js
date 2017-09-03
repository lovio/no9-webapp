import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects';
import history, { getSafePath, redirect } from 'helpers/history';
import get from 'lodash-es/get';
import split from 'lodash-es/split';
import { isPhone, isEmail } from 'helpers/validators';
import { change } from 'redux-form';

import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/auth';
import * as apis from 'helpers/api';
import { transferCode, initWechat } from 'actions/wx';
import { userInfoLoaded, clearUserInfo, loadUserInfo } from 'actions/user';
import { showToastItem, showConfirm } from '../actions/common';
import { getFormValuesByName } from './selector';
import { fetchEntity, formRequest } from './utils';

const requestWechatBindStatus =
  fetchEntity.bind(null, actions.wechatBindStatus, apis.checkWechatBindStatus);

const requestAccountUnbind =
  fetchEntity.bind(null, actions.accountUnbind, apis.unbindAccount);

function* sendCaptcha({ payload }) {
  // 1 从表单中获取手机号
  const { resolve, reject, type, captchaType } = payload;
  let value = payload.value;
  if (!value) {
    value = yield select(getFormValuesByName('signUp', 'phone'));
  }
  let tip;
  if (type === 'phone') {
    tip = isPhone('请输入正确的手机号')(value);
  } else {
    tip = isEmail('请输入正确的邮箱')(value);
  }
  if (tip) {
    yield put(showToastItem(tip));
    reject();
  } else {
    const values = type === 'phone' ? {
      type: captchaType,
      phone: value,
      group: 'C',
    } : {
      type: captchaType,
      group: 'C',
      email: value,
      emailType: 2,
    };
    yield call(formRequest, {
      api: type === 'phone' ? apis.sendPhoneCaptcha : apis.sendEmailCaptcha,
      actions: {
        failure: actions.sendCaptchaError,
      },
    }, { payload: { values, resolve, reject } });
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

function* bindAccount({ payload }) {
  const { values, resolve, reject } = payload;
  const unionId = yield select(state => state.getIn(['user', 'info', 'unionId']));
  let newValues;
  let bindType;
  if (values.account) {
    newValues = {
      ...values,
      unionId,
    };
    bindType = 'account';
  } else {
    const bindInfo = yield select(state => state.getIn(['user', 'bind']));
    const type = bindInfo.has('phone') ? 'phone' : 'email';
    const value = bindInfo.get(type);
    newValues = {
      ...values,
      unionId,
      [type]: value,
    };
    bindType = type;
  }
  yield put(actions.setBindInfo({ bindType }));
  yield call(formRequest, {
    api: apis.bindAccount,
    actions: {
      success: actions.bindAccountSuccess,
    },
  }, {
    payload: {
      values: newValues,
      resolve,
      reject,
    },
  });
}

export function* watchBindAccount() {
  yield takeEvery(actions.bindAccount, bindAccount);
}

export function* watchBindAccountSuccess() {
  for (; ;) {
    // const { payload } = yield take(actions.bindAccountSuccess);
    const bindType = yield select(state => state.getIn(['user', 'bind', 'bindType']));
    // yield call(saveCookie, payload);
    yield call(redirect, HOME_PATH, bindType !== 'account');
    yield put(showToastItem({
      type: 'success',
      msg: '绑定成功',
    }));
    yield put(userInfoLoaded());
  }
}

export function* watchBindAccountConflict() {
  for (; ;) {
    const { payload: { code, _error } } = yield take(actions.bindAccountConflict);
    const data = yield select(getFormValuesByName('bindAccount', 'account', 'password'));
    const msg = split(_error, ',');
    const name = msg.pop();
    const userId = msg.pop();
    yield put(actions.setUnbindInfo({ bindType: 'account', ...data, userId }));
    yield put(showConfirm({ code, name }));
  }
}

export function* watchAuthSuccess() {
  for (;;) {
    const { payload } = yield take(actions.authSuccess);
    if (payload) {
      // yield call(saveCookie, payload);
      yield call(redirect, HOME_PATH);
      yield put(userInfoLoaded());
    }
  }
}

export function* watchCheckWechatBindStatus() {
  for (;;) {
    // payload is code
    const { payload } = yield take(actions.checkWechatBindStatus);
    yield fork(requestWechatBindStatus, payload);
  }
}

export function* watchCheckWechatBindStatusSuccess() {
  for (;;) {
    const { payload, meta } = yield take(actions.wechatBindStatus.success);
    if (payload.isAuthorized || get(meta, 'type') === 'userinfo') {
      // yield call(saveCookie, payload);
      yield call(redirect, HOME_PATH);
      yield put(userInfoLoaded());
      history.replace(getSafePath());
      yield put(initWechat({ type: 'share' }));
      yield put(initWechat({ type: 'image' }));
    } else {
      yield put(transferCode({ type: 'userinfo', url: `${location.protocol}//${window.location.host}/#${getSafePath()}` }));
    }
  }
}

export function* watchCheckWechatBindStatusFailure() {
  for (;;) {
    yield take(actions.wechatBindStatus.failure);
    // 这个逻辑比较无脑，容易造成用户持续刷新。
    // 最好的做法是，不行了就让用户直接账号登录
    // history.goBack();
  }
}

export function* watchSignOut() {
  for (; ;) {
    yield take(actions.signOut);
    // yield call(removeCookie);
    // yield call(setUserId);
    yield put(clearUserInfo());
    // todo 这里要登录是不是在微信中跳转不同的地方
    history.push('/');
  }
}

// checkAuth 要支持外地跳转进来的，以及跳转到oauth
export function* watchCheckAuth() {
  for (; ;) {
    yield take(actions.checkAuth);
    const token = yield select(state => state.getIn(['user', 'info', 'token']));
    if (!token) {
      const { pathname, search } = history.location;
      const redirectUrl = encodeURIComponent(`${pathname}${search}`);
      history.replace(`/bind?redirectUrl=${redirectUrl}`);
    }
  }
}

export function* watchCheckAccount() {
  yield takeEvery(actions.checkAccount, formRequest, {
    api: apis.checkAccount,
    actions: {
      success: actions.checkAccountSuccess,
      failure: actions.checkAccountFailure,
    },
  });
}

export function* watchCheckAccountFailure() {
  for (; ;) {
    const { payload: { data } } = yield take(actions.checkAccountFailure);
    // code
    yield put(showConfirm(data));
  }
}

export function* watchCheckAccountSuccess() {
  for (; ;) {
    yield take(actions.checkAccountSuccess);
    history.push({
      pathname: '/bind/captcha',
      search: history.location.search,
    });
  }
}

export function* watchUnbindAccount() {
  for (; ;) {
    yield take(actions.unbindAccount);
    const unbindInfo = yield select(state => state.getIn(['user', 'unbind']));
    yield fork(requestAccountUnbind, {
      type: 'weixin',
      accountId: unbindInfo.get('userId'),
    });
  }
}

export function* watchRegisterToken() {
  for (; ;) {
    yield take(actions.registerToken);
    history.replace(getSafePath());
    yield put(loadUserInfo());
  }
}

const FORM_NAME = 'bindAccount';
function* handleReduxForm({ meta: { form }, payload: { name } }) {
  if (form === FORM_NAME) {
    const value = yield select(state => state.getIn(['user', 'unbind', name]));
    if (value) {
      yield put(change(FORM_NAME, name, value));
    }
  }
}

export function* watchForm() {
  yield takeEvery('@@redux-form/REGISTER_FIELD', handleReduxForm);
}
