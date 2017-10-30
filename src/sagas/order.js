import { take, call, select, put, fork } from 'redux-saga/effects';
import history from 'helpers/history';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/order';
import * as apis from 'helpers/api';
import { createPayment } from 'helpers/pingxx';
import get from 'lodash-es/get';
import { showConfirm, clearPagination, showToastItem } from '../actions/common';
import { fetchEntity } from './utils';

// const requestNewOrder = fetchEntity.bind(null, actions.newOrder, apis.postNewOrders);
const requestRecords = fetchEntity.bind(null, actions.records, apis.getRecords);
const requestOrder = fetchEntity.bind(null, actions.order, apis.getOrder);
const requestOrders = fetchEntity.bind(null, actions.orders, apis.getOrders);

function* loadOrder(payload) {
  yield call(requestOrder, payload, true);
}

export function* watchLoadOrder() {
  for (;;) {
    const { payload } = yield take(actions.loadOrder);
    yield fork(loadOrder, payload);
  }
}

function* loadOrders() {
  const pagination = yield select(state => state.getIn(['pagination', 'orders']));
  if (pagination.get('isLoading')) {
    return;
  }
  const param = { pageNo: pagination.get('pageNo'), pageSize: pagination.get('pageSize') };
  // if (type) {
  //   param.type = type;
  // }
  yield call(requestOrders, param, true);
}

export function* watchLoadOrders() {
  for (;;) {
    const { payload } = yield take(actions.loadOrders);
    yield put(clearPagination('orders'));
    yield fork(loadOrders, payload);
  }
}

export function* watchLoadMoreOrders() {
  for (;;) {
    const { payload } = yield take(actions.loadMoreOrders);
    yield fork(loadOrders, payload);
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

export function* watchLoadMoreRecords() {
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
    history.push(`/mine/orders/${orderId}`);
  }
}

export function* watchCreateNewOrder() {
  for (;;) {
    const { payload: { cityId, product, amount } } = yield take(actions.createNewOrder);
    const user = yield select(state => state.get('user'));
    if (user.get('name') && user.get('IDCardNo')) {
      const openid = yield select(state => state.getIn(['user', 'openid']));
      const token = yield select(state => state.getIn(['user', 'token']));
      const { response, error } = yield call(apis.postNewOrders, {
        openid: openid || '123',
        cityId,
        amount,
        productId: product.get('id'),
        token,
      });
      if (error) {
        const errorCode = get(error, 'data.code');
        if (errorCode === 'has_unfinished_order') {
          yield put(
            showConfirm({
              type: 'unfinishedOrder',
              desc: ['您有未完成的订单，请先完成'],
            })
          );
        } else {
          yield put(showToastItem('获取支付凭证失败'));
        }
      } else {
        yield call(pay, response.credential, response.id);
      }
    } else {
      yield put(
        showConfirm({
          type: 'profileIncomplete',
          desc: ['实名信息未完善，请先完善实名信息'],
        })
      );
    }
  }
}

export function* watchTriggerWechatPay() {
  for (;;) {
    const { payload: { orderId, amount } } = yield take(actions.triggerWechatPay);
    const openid = yield select(state => state.getIn(['user', 'openid']));
    const token = yield select(state => state.getIn(['user', 'token']));
    const { response, error } = yield call(apis.getPaymentPkg, {
      openid: openid || '123',
      orderId,
      token,
      amount,
    });
    if (error) {
      yield put(showToastItem('获取支付凭证失败'));
    } else {
      yield fork(pay, response, orderId);
    }
  }
}

export function* watchCancelOrder() {
  for (;;) {
    const { payload: { orderId } } = yield take(actions.cancel);
    const token = yield select(state => state.getIn(['user', 'token']));
    const { response, error } = yield call(apis.cancelOrder, {
      id: orderId,
      token,
    });
    if (error) {
      console.log(response, error);
      yield put(showToastItem(get(error, 'data.message')));
    } else {
      yield put(showToastItem({ type: 'success', msg: '订单已取消' }));
    }

    yield put(actions.loadOrders());
  }
}
