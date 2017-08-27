import { call, take } from 'redux-saga/effects';

import * as apis from 'helpers/api';
import { fetchEntity } from 'sagas/utils';
import * as actions from './actions';

// 获取勋章列表
export function* watchGetMedals() {
  for (;;) {
    const { payload } = yield take(actions.getMedals);
    yield call(fetchEntity, actions.realGetMedals, apis.getMedals, payload, true);
  }
}
