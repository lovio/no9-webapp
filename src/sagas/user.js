import { take, put, call, takeEvery } from 'redux-saga/effects';
import history from 'helpers/history';

import * as actions from 'actions/user';
import * as apis from 'helpers/api';
import { showToastItem } from '../actions/common';
import { formRequest, fetchEntity } from './utils';

const requestCards = fetchEntity.bind(null, actions.cards, apis.getCards);
const requestRemoveCard = fetchEntity.bind(null, actions.cardRemove, apis.removeCard);

// 获取用户信息
function* loadCards({ payload }) {
  yield call(requestCards, payload || {}, true);
}

export function* watchLoadCards() {
  yield takeEvery(actions.loadCards, loadCards);
}

function* addNewCard({ payload }) {
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
      api: apis.addNewCard,
      actions: {
        success: actions.addNewCardSuccess,
      },
      needToken: true,
    },
    {
      payload: { values, resolve, reject },
    },
  );
}

export function* watchAddNewCard() {
  yield takeEvery(actions.addNewCard, addNewCard);
}

export function* watchAddNewCardSuccess() {
  for (;;) {
    yield take(actions.addNewCardSuccess);
    yield put(
      showToastItem({
        type: 'success',
        msg: '银行卡添加成功',
      }),
    );
    history.push('/mine/cards');
  }
}

export function* watchRemoveCard() {
  for (;;) {
    const { payload } = yield take(actions.removeCard);
    yield call(requestRemoveCard, { id: payload }, true);
  }
}

const fieldMappings = {
  name: '姓名',
  IDCardNo: '身份证号',
  email: '邮箱',
  address: '快递地址',
};

export function* watchUpdateProfile() {
  for (;;) {
    const { payload: { values, resolve, reject } } = yield take(actions.updateProfile);
    const { field, value } = values;
    if (!value) {
      yield put(showToastItem({ type: 'error', msg: `${fieldMappings[field]}不能为空` }));
      reject();
    }

    yield call(
      formRequest,
      {
        api: apis.updateProfile,
        actions: {
          success: actions.updateProfileSuccess,
          failure: actions.updateProfileFailure,
        },
        needToken: true,
      },
      {
        payload: {
          values: {
            [field]: value,
          },
          resolve,
          reject,
        },
      },
    );
  }
}

export function* watchUpdateProfileSuccess() {
  for (;;) {
    yield take(actions.updateProfileSuccess);
    yield put(showToastItem({ type: 'success', msg: '修改成功' }));
  }
}

export function* watchUpdateProfileFailure() {
  for (;;) {
    const { payload } = yield take(actions.updateProfileFailure);
    console.log(payload);
    yield put(showToastItem({ type: 'error', msg: `${payload.msg}` }));
  }
}
