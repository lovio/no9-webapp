import { fork, all } from 'redux-saga/effects';

import values from 'lodash-es/values';
import map from 'lodash-es/map';
import flatMap from 'lodash-es/flatMap';

import { sagas } from 'modules';

import * as userSagas from './user';
import * as commonSagas from './common';
import * as authSagas from './auth';
import * as wxSagas from './wx';
import * as mittSagas from './mitt';
import * as startupSagas from './startup';

const composeSagas = sagasArr => all(map(flatMap(sagasArr, values), fork));

export default function* root() {
  yield composeSagas([
    ...sagas,
    userSagas,
    commonSagas,
    authSagas,
    wxSagas,
    mittSagas,
    // 顺序是很重要的
    startupSagas,
  ]);
}
