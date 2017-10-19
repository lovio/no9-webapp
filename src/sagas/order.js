import { take, call, select, put, fork } from 'redux-saga/effects';
import history from 'helpers/history';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/order';
import * as apis from 'helpers/api';
import { createPayment } from 'helpers/pingxx';
import { showConfirm, clearPagination, showToastItem } from '../actions/common';
import { fetchEntity } from './utils';

// const requestNewOrder = fetchEntity.bind(null, actions.newOrder, apis.postNewOrders);
const requestPayment = fetchEntity.bind(null, actions.payment, apis.getPaymentPkg);
const requestRecords = fetchEntity.bind(null, actions.records, apis.getRecords);
const requestOrder = fetchEntity.bind(null, actions.order, apis.getOrder);

function* loadOrder(payload) {
  yield call(requestOrder, payload, true);
}

export function* watchLoadOrder() {
  for (;;) {
    const { payload } = yield take(actions.loadOrder);
    yield fork(loadOrder, payload);
  }
}

function* loadRecords({ type }) {
  const pagination = yield select(state => state.getIn(['pagination', 'records']));
  if (pagination.get('isLoading')) {
    return;
  }
  const param = { pageNo: pagination.get('pageNo'), pageSize: pagination.get('pageSize') };
  if (type) {
    param.type = type;
  }
  yield call(requestRecords, param, true);
}

export function* watchLoadRecords() {
  for (;;) {
    const { payload } = yield take(actions.loadRecords);
    yield put(clearPagination('records'));
    yield fork(loadRecords, payload);
  }
}

export function* watchLoadMorePhotos() {
  for (;;) {
    const { payload } = yield take(actions.loadMoreRecords);
    yield fork(loadRecords, payload);
  }
}

function* pay(charge, orderId) {
  const { status } = yield call(createPayment, charge);
  if (status === 'fail') {
    yield put(showToastItem('支付失败'));
  } else if (status === 'success') {
    yield put(showToastItem({ type: 'success', msg: '支付成功' }));
    history.push(`/orders/success?orderId=${orderId}`);
  }
}

export function* watchCreateNewOrder() {
  for (;;) {
    const { payload: { cityId, product } } = yield take(actions.createNewOrder);
    const user = yield select(state => state.get('user'));
    if (user.get('name') && user.get('IDCardNo')) {
      const openid = user.get('openid') || 'oDCCVuIQeIug7Gx4OHIOsjrUWFFY';
      const token = yield select(state => state.getIn(['user', 'token']));
      const { response, error } = yield call(apis.postNewOrders, {
        openid,
        cityId,
        productId: product.get('id'),
        token,
      });
      if (error) {
        yield put(showToastItem('获取支付凭证失败'));
      } else {
        yield call(pay, response.credential, response.id);
      }
    } else {
      yield put(
        showConfirm({
          type: 'profileIncomplete',
          desc: ['实名信息未完善，请先完善实名信息'],
        }),
      );
    }
  }
}

export function* watchTriggerWechatPay() {
  for (;;) {
    const { payload: { orderId } } = yield take(actions.triggerWechatPay);
    const openid =
      (yield select(state => state.getIn(['user', 'openid']))) || 'oDCCVuIQeIug7Gx4OHIOsjrUWFFY';
    const payment = yield call(
      requestPayment,
      {
        orderId,
        openid,
      },
      true,
    );
    console.log(payment);
  }
}
