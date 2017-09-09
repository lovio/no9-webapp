import { take, put, call, select, takeEvery } from 'redux-saga/effects';
import { isPhone } from 'helpers/validators';

import * as actions from 'actions/auth';
import * as apis from 'helpers/api';
import { getFormValuesByName } from './selector';
import { showToastItem } from '../actions/common';
import { formRequest } from './utils';

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

export function* watchBindAccount() {
  yield takeEvery(actions.signIn, signIn);
}

// export function* watchBindAccountSuccess() {
//   for (;;) {
//     // const { payload } = yield take(actions.bindAccountSuccess);
//     const bindType = yield select(state => state.getIn(['user', 'bind', 'bindType']));
//     // yield call(saveCookie, payload);
//     yield call(redirect, HOME_PATH, bindType !== 'account');
//     yield put(
//       showToastItem({
//         type: 'success',
//         msg: '绑定成功',
//       }),
//     );
//     yield put(userInfoLoaded());
//   }
// }

// export function* watchBindAccountConflict() {
//   for (;;) {
//     const { payload: { code, _error } } = yield take(actions.bindAccountConflict);
//     const data = yield select(getFormValuesByName('bindAccount', 'account', 'password'));
//     const msg = split(_error, ',');
//     const name = msg.pop();
//     const userId = msg.pop();
//     yield put(actions.setUnbindInfo({ bindType: 'account', ...data, userId }));
//     yield put(showConfirm({ code, name }));
//   }
// }

// export function* watchAuthSuccess() {
//   for (;;) {
//     const { payload } = yield take(actions.authSuccess);
//     if (payload) {
//       // yield call(saveCookie, payload);
//       yield call(redirect, HOME_PATH);
//       yield put(userInfoLoaded());
//     }
//   }
// }

// export function* watchCheckWechatBindStatus() {
//   for (;;) {
//     // payload is code
//     const { payload } = yield take(actions.checkWechatBindStatus);
//     yield fork(requestWechatBindStatus, payload);
//   }
// }

// export function* watchCheckWechatBindStatusSuccess() {
//   for (;;) {
//     const { payload, meta } = yield take(actions.wechatBindStatus.success);
//     if (payload.isAuthorized || get(meta, 'type') === 'userinfo') {
//       // yield call(saveCookie, payload);
//       yield call(redirect, HOME_PATH);
//       yield put(userInfoLoaded());
//       history.replace(getSafePath());
//       yield put(initWechat({ type: 'share' }));
//       yield put(initWechat({ type: 'image' }));
//     } else {
//       yield put(
//         transferCode({
//           type: 'userinfo',
//           url: `${location.protocol}//${window.location.host}/#${getSafePath()}`,
//         }),
//       );
//     }
//   }
// }

// export function* watchCheckWechatBindStatusFailure() {
//   for (;;) {
//     yield take(actions.wechatBindStatus.failure);
//     // 这个逻辑比较无脑，容易造成用户持续刷新。
//     // 最好的做法是，不行了就让用户直接账号登录
//     // history.goBack();
//   }
// }

// export function* watchSignOut() {
//   for (;;) {
//     yield take(actions.signOut);
//     // yield call(removeCookie);
//     // yield call(setUserId);
//     yield put(clearUserInfo());
//     // todo 这里要登录是不是在微信中跳转不同的地方
//     history.push('/');
//   }
// }

// // checkAuth 要支持外地跳转进来的，以及跳转到oauth
// export function* watchCheckAuth() {
//   for (;;) {
//     yield take(actions.checkAuth);
//     const token = yield select(state => state.getIn(['user', 'info', 'token']));
//     if (!token) {
//       const { pathname, search } = history.location;
//       const redirectUrl = encodeURIComponent(`${pathname}${search}`);
//       history.replace(`/bind?redirectUrl=${redirectUrl}`);
//     }
//   }
// }

// export function* watchCheckAccount() {
//   yield takeEvery(actions.checkAccount, formRequest, {
//     api: apis.checkAccount,
//     actions: {
//       success: actions.checkAccountSuccess,
//       failure: actions.checkAccountFailure,
//     },
//   });
// }

// export function* watchCheckAccountFailure() {
//   for (;;) {
//     const { payload: { data } } = yield take(actions.checkAccountFailure);
//     // code
//     yield put(showConfirm(data));
//   }
// }

// export function* watchCheckAccountSuccess() {
//   for (;;) {
//     yield take(actions.checkAccountSuccess);
//     history.push({
//       pathname: '/bind/captcha',
//       search: history.location.search,
//     });
//   }
// }

// // export function* watchUnbindAccount() {
// //   for (;;) {
// //     yield take(actions.unbindAccount);
// //     const unbindInfo = yield select(state => state.getIn(['user', 'unbind']));
// //     yield fork(requestAccountUnbind, {
// //       type: 'weixin',
// //       accountId: unbindInfo.get('userId'),
// //     });
// //   }
// // }

// export function* watchRegisterToken() {
//   for (;;) {
//     yield take(actions.registerToken);
//     history.replace(getSafePath());
//     yield put(loadUserInfo());
//   }
// }

// const FORM_NAME = 'bindAccount';
// function* handleReduxForm({ meta: { form }, payload: { name } }) {
//   if (form === FORM_NAME) {
//     const value = yield select(state => state.getIn(['user', 'unbind', name]));
//     if (value) {
//       yield put(change(FORM_NAME, name, value));
//     }
//   }
// }

// export function* watchForm() {
//   yield takeEvery('@@redux-form/REGISTER_FIELD', handleReduxForm);
// }
