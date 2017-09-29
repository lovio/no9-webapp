import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects';
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

// modal
function* handleShowModal({ payload: { willHide } }) {
  if (willHide) {
    yield call(delay, ToastMsgTimeout);
    yield put(commonActions.hideModal());
  }
}

function* handleHideModal() {
  // const next = yield select(state => state.getIn(['common', 'modal', 'next']));
  // if (next === 'redirect2Profile') {
  //   history.push('/mine/profile');
  // }
  // if (next) {
  //   if (next.get('type') === 'medal') {
  //     yield put(commonActions.showMedal({ id: next.get('id') }));
  //   }
  // }
  yield put(commonActions.clearModalData());
}

export function* watchShowModal() {
  yield takeEvery(commonActions.showModal, handleShowModal);
}

export function* watchHideModal() {
  yield takeEvery(commonActions.hideModal, handleHideModal);
}

export function* watchHandleConfirm() {
  for (;;) {
    yield take(commonActions.handleConfirm);
    const type = yield select(state => state.getIn(['common', 'confirm', 'type']));
    if (type === 'profileIncomplete') {
      yield put(commonActions.hideConfirm());
      history.push({
        pathname: '/mine/profile',
        // search: history.location.search,
      });
    }
  }
}

const TOAST_BLACK_LIST = [];

export function* watchFailure() {
  for (;;) {
    const { type, payload } = yield take(action => includes(action.type, 'FAILURE'));
    if (!some(TOAST_BLACK_LIST, entity => includes(type, entity))) {
      const msg = (payload && get(payload, 'data.message')) || get(payload, 'data') || '出错啦';
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
