import { call, take } from 'redux-saga/effects';

import * as apis from 'helpers/api';
import { fetchEntity } from 'sagas/utils';
import * as actions from './actions';

// 获取积分列表
export function* watchGetCreditRecords() {
  for (;;) {
    const { payload } = yield take(actions.getCreditRecords);
    yield call(fetchEntity, actions.realGetCreditRecords, apis.getCreditRecords, payload, true);
  }
}
