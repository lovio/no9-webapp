import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import qs from 'qs';
import { inWechat } from 'helpers/ua';

import assign from 'lodash-es/assign';
import isEmpty from 'lodash-es/isEmpty';
import isArray from 'lodash-es/isArray';
import pickBy from 'lodash-es/pickBy';
import last from 'lodash-es/last';

import * as actions from 'actions/wx';
import * as commonActions from 'actions/common';
import * as userActions from 'actions/user';
import * as wxHelper from 'helpers/wx';
import * as apis from 'helpers/api';
import { fetchEntity } from './utils';

import { site, STATIC_PREFIX } from '../../config.json';

// const cacheURLForIOS = location.href.split('#')[0];

const requestUploadAvatar =
  fetchEntity.bind(null, userActions.avatarUpload, apis.uploadHeadImage);

// 跳转获取code
export function* watchCode() {
  for (;;) {
    const { payload } = yield take(actions.transferCode);
    if (inWechat) {
      yield fork(wxHelper.transferCode, payload || {});
    }
  }
}

const jsApiMapping = {
  share: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
  ],
  image: [
    'chooseImage',
    'uploadImage',
    'previewImage',
    'downloadImage',
  ],
};

function* getWXData(payload) {
  if (payload.type === 'share') {
    const userId = yield select(state => state.getIn(['user', 'info', 'userId']));
    return assign({
      link: `${site.zhanToefl}/#/share?${qs.stringify({ userId })}`,
      title: '智课斩托福',
      imgUrl: `http:${STATIC_PREFIX}logo.jpg`,
      desc: '托福大杀器！备考黑科技！',
    }, pickBy(payload.data));
  }
  return {};
}

function* triggerWechatAction(payload, config) {
  if (!isEmpty(config)) {
    try {
      yield call(wxHelper.initWechatConfig, config);
      if (payload.type === 'share') {
        // const func = functionMapping[type] || noop;
        const params = yield call(getWXData, payload);
        yield call(wxHelper.setShare, params);
      }
    } catch (e) {
      // yield put(commonActions.showToastItem('加载weixin配置错误'));
    }
  }
}

function* loadJSSDKConfig(type) {
  const { response } = yield call(apis.getJSConfigConfig, {
    url: location.href.split('#')[0],
    tower: '1nMvh3jwQMaGse2xCT06lsx5AXDqpVXt',
  });
  return response ? assign(response, { jsApiList: jsApiMapping[type] }) : {};
}

function* initiWechat({ payload }) {
  if (inWechat) {
    const config = yield call(loadJSSDKConfig, payload.type);
    yield call(triggerWechatAction, payload, config);
  }
}

// use takeEvery to ensure trigger everytime
export function* watchInitWechat() {
  yield takeEvery(actions.initWechat, initiWechat);
}


export function* watchUploadAvatar() {
  for (; ;) {
    yield take(userActions.uploadAvatar);
    if (inWechat) {
      try {
        const localId = yield call(wxHelper.chooseImage);
        if (localId) {
          yield put(userActions.loadWechatImage(localId));
          yield call(delay, 100);
          const mediaId = yield call(wxHelper.uploadImage, localId);
          yield call(requestUploadAvatar, { mediaId }, true);
        }
      } catch (e) {
        yield put(commonActions.showToastItem('上传图片错误'));
      }
    }
  }
}

export function* watchUploadAvatarSuccess() {
  for (; ;) {
    yield take(userActions.avatarUpload.success);
    yield put(commonActions.showToastItem({ type: 'success', msg: '上传图片成功' }));
    yield put(userActions.loadUserInfo());
  }
}

export function* watchUserDataLoadedAndShare() {
  for (; ;) {
    yield take(userActions.userInfoLoaded);
    yield put(actions.initWechat({ type: 'share' }));
  }
}

export function* watchCheckinWithDataLoadedAndShare() {
  for (; ;) {
    yield take(userActions.checkin.success);
    yield put(actions.initWechat({ type: 'share' }));
  }
}

export function* watchUploadShareStatsSuccess() {
  for (; ;) {
    const { payload } = yield take(userActions.shareStats.success);
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
      yield put(commonActions.showModal(modalData));
    }
  }
}
