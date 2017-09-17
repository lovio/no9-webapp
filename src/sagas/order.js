import { take, call, select, takeEvery } from 'redux-saga/effects';
// import history, { redirect } from 'helpers/history';
// import { isPhone } from 'helpers/validators';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/order';
import * as apis from 'helpers/api';
// import { getFormValuesByName } from './selector';
// import { showToastItem } from '../actions/common';
import { fetchEntity } from './utils';

const requestNewOrder = fetchEntity.bind(null, actions.newOrder, apis.postNewOrders);
const requestPayment = fetchEntity.bind(null, actions.payment, apis.getPaymentPkg);
const requestCities = fetchEntity.bind(null, actions.cities, apis.getCities);

export function* watchCreateNewOrder() {
  for (;;) {
    const { payload: { cityId, product } } = yield take(actions.createNewOrder);
    const openid =
      (yield select(state => state.getIn(['user', 'openid']))) || 'oDCCVuIQeIug7Gx4OHIOsjrUWFFY';
    const order = yield call(
      requestNewOrder,
      {
        openid,
        cityId,
        productId: product.get('id'),
      },
      true,
    );
    // here now we should trigger payment
    console.log(order);
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

export function* watchLoadCities() {
  yield takeEvery(actions.loadCities, requestCities);
}
