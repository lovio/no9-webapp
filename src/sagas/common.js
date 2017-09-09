import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import get from 'lodash-es/get';
import includes from 'lodash-es/includes';
import some from 'lodash-es/some';
import history from 'helpers/history';

// import { transferCode } from 'actions/wx';
import * as commonActions from 'actions/common';
import { ToastMsgTimeout } from 'constants/constants.json';

// // 获取用户信息
// export function* watchGetUser() {
//   for (;;) {
//     const { payload } = yield take(commonActions.getUser);
//     yield call(fetchEntity, commonActions.realGetUser, apis.getUser, payload, true);
//   }
// }

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

const TOAST_BLACK_LIST = [];

export function* watchFailure() {
  for (;;) {
    const { type, payload } = yield take(action => includes(action.type, 'FAILURE'));
    if (!some(TOAST_BLACK_LIST, entity => includes(type, entity))) {
      const msg = payload ? get(payload, 'data.msg') : '出错啦';
      yield put(commonActions.showToastItem({ type: 'error', msg }));
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
        pathname: '/login',
        search: `?redirectUrl=${payload}`,
      });
    }
  }
}
