import { fork, all } from 'redux-saga/effects';

import values from 'lodash-es/values';
import map from 'lodash-es/map';
import flatMap from 'lodash-es/flatMap';

// import * as userSagas from './user';
import * as authSagas from './auth';
import * as commonSagas from './common';
import * as orderSagas from './order';
import * as extraSagas from './extra';
import * as userSagas from './user';
// import * as wxSagas from './wx';
// import * as mittSagas from './mitt';
// import * as startupSagas from './startup';

const composeSagas = sagasArr => all(map(flatMap(sagasArr, values), fork));

export default function* root() {
  yield composeSagas([
    authSagas,
    userSagas,
    commonSagas,
    orderSagas,
    extraSagas,
    // wxSagas,
    // mittSagas,
    // 顺序是很重要的
    // startupSagas,
  ]);
}
