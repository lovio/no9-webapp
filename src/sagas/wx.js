import { take, call, fork, select, put, takeEvery } from 'redux-saga/effects';
import qs from 'qs';
import history, { getSafePath } from 'helpers/history';
import { inWechat } from 'helpers/ua';

import assign from 'lodash-es/assign';
import isEmpty from 'lodash-es/isEmpty';
import pickBy from 'lodash-es/pickBy';

import * as actions from 'actions/wx';
import * as wxHelper from 'helpers/wx';
import * as apis from 'helpers/api';
import { fetchEntity } from './utils';

import { site, STATIC_PREFIX } from '../../config.json';

// const cacheURLForIOS = location.href.split('#')[0];

const requestOpenID = fetchEntity.bind(null, actions.openid, apis.getOpenID);

// 跳转获取code
export function* watchCode() {
  for (;;) {
    const { payload } = yield take(actions.transferCode);
    if (inWechat) {
      yield fork(wxHelper.transferCode, payload || {});
    }
  }
}

function* getOpenID(payload) {
  yield call(requestOpenID, payload);
}

export function* watchGetOpenIDByCode() {
  for (;;) {
    const { payload } = yield take(actions.getOpenIDByCode);
    yield call(getOpenID, payload);
  }
}

export function* watchOpenIDSuccess() {
  for (;;) {
    yield take(actions.openid.success);
    history.replace(getSafePath());
  }
}

export function* watchOpenIDFailure() {
  for (;;) {
    yield take(actions.openid.failure);
    history.replace(getSafePath());
    yield put(actions.transferCode());
  }
}

const jsApiMapping = {
  share: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
  image: ['chooseImage', 'uploadImage', 'previewImage', 'downloadImage'],
};

function* getWXData(payload) {
  if (payload.type === 'share') {
    const userId = yield select(state => state.getIn(['user', 'info', 'userId']));
    return assign(
      {
        link: `${site.zhanToefl}/#/share?${qs.stringify({ userId })}`,
        title: '智课斩托福',
        imgUrl: `http:${STATIC_PREFIX}logo.jpg`,
        desc: '托福大杀器！备考黑科技！',
      },
      pickBy(payload.data)
    );
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
