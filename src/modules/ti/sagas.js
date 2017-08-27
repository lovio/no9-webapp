import { take, call, takeEvery } from 'redux-saga/effects';
import qs from 'qs';
import get from 'lodash-es/get';
import assign from 'lodash-es/assign';
import history, { getSearch } from 'helpers/history';

import * as apis from 'helpers/api';
import { fetchEntity } from 'sagas/utils';

import * as actions from './actions';

const requestExerciseMenu =
  fetchEntity.bind(null, actions.exerciseMenu, apis.getExerciseMenu);

const requestExerciseQuestionPackage =
  fetchEntity.bind(null, actions.exerciseQuestionPackage, apis.getExerciseQuestionPackage);

const requestExerciseCounts =
  fetchEntity.bind(null, actions.exerciseCounts, apis.getExerciseCounts);

const requestTiTopics =
  fetchEntity.bind(null, actions.tiTopics, apis.getTiTopics);

const requestTiTopic =
  fetchEntity.bind(null, actions.tiTopic, apis.getTiTopic);

const requestLatelyExercise =
  fetchEntity.bind(null, actions.latelyExercise, apis.getExerciseLately, {}, true);

function* loadExerciseMenu({ payload }) {
  yield call(requestExerciseMenu, payload, true);
}

export function* watchLoadExerciseMenu() {
  yield takeEvery(actions.loadExerciseMenu, loadExerciseMenu);
}

export function* watchLoadExerciseMenuSuccess() {
  for (;;) {
    const { payload } = yield take(actions.exerciseMenu.success);
    const search = getSearch(history.location.search);
    if (!search.textbookId) {
      const firstTextbookId = get(payload[0], 'id');
      const newSearch = assign({ textbookId: firstTextbookId }, search);
      history.replace(`${history.location.pathname}?${qs.stringify(newSearch)}`);
    }
  }
}

function* loadExerciseQuestionPackage({ payload }) {
  yield call(requestExerciseQuestionPackage, payload, true);
}

export function* watchLoadExerciseQuestionPackage() {
  yield takeEvery(actions.loadExerciseQuestionPackage, loadExerciseQuestionPackage);
}

function* loadTiTopics({ payload }) {
  yield call(requestTiTopics, payload, true);
}

export function* watchLoadTiTopics() {
  yield takeEvery(actions.loadTiTopics, loadTiTopics);
}

function* loadTiTopic({ payload }) {
  yield call(requestTiTopic, payload, true);
}

export function* watchLoadTiTopic() {
  yield takeEvery(actions.loadTiTopic, loadTiTopic);
}

function* loadExerciseCounts({ payload }) {
  yield call(requestExerciseCounts, payload);
}

export function* watchLoadExerciseCounts() {
  yield takeEvery(actions.loadExerciseCounts, loadExerciseCounts);
}

export function* watchLoadLatelyExercise() {
  yield takeEvery(actions.loadLatelyExercise, requestLatelyExercise);
}
