import { take, call, put, takeEvery, select } from 'redux-saga/effects';
import format from 'date-fns/format';

import isArray from 'lodash-es/isArray';
import last from 'lodash-es/last';
import history, { redirect } from 'helpers/history';
import * as actions from 'actions/user';
import { showModal, showToastItem } from 'actions/common';
import * as apis from '../helpers/api';
import { fetchEntity, formRequest, saveCookie } from './utils';

const requestCredits =
  fetchEntity.bind(null, actions.credits, apis.getCredits, { extra: 1 }, true);

const requestIntention =
  fetchEntity.bind(null, actions.intention, apis.getIntention, {}, true);

const requestCheckin =
  fetchEntity.bind(null, actions.checkin, apis.getCheckin);

const postCheckin =
  fetchEntity.bind(null, actions.checkinRequest, apis.postCheckin);

const requestAnswerCount =
  fetchEntity.bind(null, actions.answerCount, apis.getAnswerCount, {}, true);

const requestAbroadPlan =
  fetchEntity.bind(null, actions.abroadPlan, apis.getAbroadPlan, {}, true);

const requestShareInfo =
  fetchEntity.bind(null, actions.shareInfo, apis.getShareInfo);

const requestCapabilityTest =
  fetchEntity.bind(null, actions.capabilityTest, apis.getCapabilityTest);

const requestUserInfo =
  fetchEntity.bind(null, actions.userInfo, apis.checkWechatBindStatus);

function* loadUserInfo() {
  const unionId = yield select(state => state.getIn(['user', 'info', 'unionId']));
  yield call(requestUserInfo, { unionId }, true);
}

export function* watchLoadUserInfo() {
  yield takeEvery(actions.loadUserInfo, loadUserInfo);
}

export function* watchLoadUserInfoSuccess() {
  const { payload } = yield take(actions.userInfo.success);
  yield call(saveCookie, payload);
}

export function* watchLoadCredits() {
  yield takeEvery(actions.loadCredits, requestCredits);
}

export function* watchLoadIntention() {
  yield takeEvery(actions.loadIntention, requestIntention);
}

function* loadCheckin({ payload }) {
  yield call(requestCheckin, payload || {}, true);
}

export function* watchLoadCheckin() {
  yield takeEvery(actions.loadCheckin, loadCheckin);
}

export function* watchLoadAnserCount() {
  yield takeEvery(actions.loadAnswerCount, requestAnswerCount);
}

function* loadCapabilityTest({ payload }) {
  yield call(requestCapabilityTest, payload || {}, true);
}

export function* watchLoadCapabilityTest() {
  yield takeEvery(actions.loadCapabilityTest, loadCapabilityTest);
}

export function* watchLoadUserData() {
  for (;;) {
    yield take(actions.loadUserData);
    yield put(actions.loadAnswerCount());
    yield put(actions.loadCredits());
    yield put(actions.loadIntention());
    yield put(actions.loadCheckin());
  }
}

export function* watchDoCheckin() {
  for (;;) {
    yield take(actions.doCheckin);
    const d = Date.now();
    const year = format(d, 'YYYY');
    const month = format(d, 'M');
    const day = format(d, 'D');
    yield call(postCheckin, { year, month, day }, true);
  }
}

export function* watchDoCheckinSuccess() {
  for (;;) {
    const { payload } = yield take(actions.checkinRequest.success);
    const {
      singleDaysPoint,
      thirtyDaysPoint,
      fourteenDaysPoint,
      sevenDaysPoint,
      pointDescription,
      point,
      medal,
    } = payload;
    if (singleDaysPoint || sevenDaysPoint || fourteenDaysPoint || thirtyDaysPoint) {
      const modalData = {
        type: 'credits',
        data: {
          point,
          desc: isArray(pointDescription) ? last(pointDescription) : pointDescription,
        },
        willHide: true,
      };
      if (medal) {
        modalData.next = {
          type: 'medal',
          id: medal,
        };
      }
      yield put(showModal(modalData));
    }
  }
}

// =============================================
export function* watchLoadAbroadPlan() {
  yield takeEvery(actions.loadAbroadPlan, requestAbroadPlan);
}

export function* watchUploadAbroadPlan() {
  yield takeEvery(actions.uploadAbroadPlan, formRequest, {
    api: apis.uploadAbroadPlan,
    actions: {
      success: actions.uploadAbroadPlanSuccess,
    },
    needToken: true,
  });
}

export function* watchUploadAbroadPlanSuccess() {
  for (;;) {
    yield take(actions.uploadAbroadPlanSuccess);
    yield put(showToastItem({ type: 'success', msg: '成功设置留学规划' }));
    redirect('/user');
  }
}

// 需要给formRequest一个预处理
export function* watchSetExamTime() {
  yield takeEvery(actions.setExamTime, formRequest, {
    api: apis.postExamTime,
    actions: {
      success: actions.setExamTimeSuccess,
    },
    needToken: true,
  });
}

export function* watchSetExamTimeSuccess() {
  for (;;) {
    yield take(actions.setExamTimeSuccess);
    yield put(showToastItem({ type: 'success', msg: '考试时间设置成功' }));
    history.push('/');
  }
}

function* loadShareInfo({ payload }) {
  yield call(requestShareInfo, payload);
}

export function* watchLoadShareInfo() {
  yield takeEvery(actions.loadShareInfo, loadShareInfo);
}

export function* watchChangeName() {
  for (; ;) {
    const { payload: { values, resolve, reject } } = yield take(actions.changeName);
    // 1 从表单中获取手机号
    const name = values.nickname;
    if (!name) {
      yield put(showToastItem({ type: 'error', msg: '昵称不能为空' }));
      reject();
    } else {
      yield call(formRequest, {
        api: apis.postChangeName,
        actions: {
          failure: actions.changeNameFailure,
          success: actions.changeNameSuccess,
        },
        needToken: true,
      }, { payload: { values, resolve, reject } });
    }
  }
}

export function* watchChangeNameSuccess() {
  for (; ;) {
    yield take(actions.changeNameSuccess);
    yield put(showToastItem({ type: 'success', msg: '昵称修改成功' }));
  }
}

export function* watchChangeNameFailure() {
  for (; ;) {
    const { payload: { msg } } = yield take(actions.changeNameFailure);
    yield put(showToastItem({ type: 'error', msg: `昵称修改失败，${msg}` }));
  }
}

export function* watchChangePhone() {
  yield takeEvery(actions.changePhone, formRequest, {
    api: apis.changePhone,
    actions: {
      success: actions.changePhoneSuccess,
    },
    needToken: true,
    tokenKey: 'userToken',
  });
}

export function* watchChangePhoneSuccess() {
  for (; ;) {
    yield take(actions.changePhoneSuccess);
    yield put(showToastItem({ type: 'success', msg: '修改手机号成功' }));
    history.push('/user');
  }
}

export function* watchUploadMeiqiaStatsSuccess() {
  for (; ;) {
    const { payload } = yield take(actions.meiqiaStats.success);
    if (payload.isPoint) {
      const { point, pointDescription, medal } = payload;
      const modalData = {
        type: 'credits',
        data: {
          point,
          desc: isArray(pointDescription) ? last(pointDescription) : pointDescription,
        },
        willHide: true,
      };
      if (medal) {
        modalData.next = {
          type: 'medal',
          id: medal,
        };
      }
      yield put(showModal(modalData));
    }
  }
}
