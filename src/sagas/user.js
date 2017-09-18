import { take, put, call, takeEvery } from 'redux-saga/effects';
import history from 'helpers/history';

import * as actions from 'actions/user';
import * as apis from 'helpers/api';
import { showToastItem } from '../actions/common';
import { formRequest, fetchEntity } from './utils';

const requestCards = fetchEntity.bind(null, actions.cards, apis.getCards);

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
