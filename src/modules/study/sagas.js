import { call, takeEvery } from 'redux-saga/effects';

import * as apis from 'helpers/api';
import { fetchEntity } from 'sagas/utils';
import * as actions from './actions';

const requestStudyRecords =
  fetchEntity.bind(null, actions.studyRecords, apis.getStudyRecords);

function* loadStudyRecords({ payload }) {
  yield call(requestStudyRecords, payload, true);
}

export function* watchLoadStudyRecords() {
  yield takeEvery(actions.loadStudyRecords, loadStudyRecords);
}
