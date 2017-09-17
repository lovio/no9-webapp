import { take, call, select, takeEvery } from 'redux-saga/effects';
// import history, { redirect } from 'helpers/history';
// import { isPhone } from 'helpers/validators';

// import { HOME_PATH } from 'constants/constants.json';
import * as actions from 'actions/order';
import * as apis from 'helpers/api';
// import { getFormValuesByName } from './selector';
// import { showToastItem } from '../actions/common';
import { fetchEntity } from './utils';

const requestPayment = fetchEntity.bind(null, actions.payment, apis.getPaymentPkg);
const requestCities = fetchEntity.bind(null, actions.cities, apis.getCities);

export function* watchTriggerWechatPay() {
  for (;;) {
    const { payload } = yield take(actions.triggerWechatPay);
    const openid =
      (yield select(state => state.getIn(['user', 'openid']))) || 'oDCCVuIQeIug7Gx4OHIOsjrUWFFY';
    const payment = yield call(requestPayment, {
      openid,
      productId: payload.get('id'),
    });
    console.log(payment);
  }
}

export function* watchLoadCities() {
  yield takeEvery(actions.loadCities, requestCities);
}
