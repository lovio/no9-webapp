import { put, select } from 'redux-saga/effects';
import { getSearch } from 'helpers/history';
import { inWechat } from 'helpers/ua';
import { transferCode, getOpenIDByCode } from 'actions/wx';
import isArray from 'lodash-es/isArray';
// import { checkWechatBindStatus, registerToken } from 'actions/auth';
// import includes from 'lodash-es/includes';

// 包含share的都走验证流程
export function* wechatOauth() {
  // const { pathname } = history.location;
  // TODO: 需要重构自动登录
  // const openid = yield select(state => state.getIn(['user', 'openid']));
  if (inWechat) {
    const search = getSearch(window.location.href.split('?').pop());
    const code = search.code;
    if (!code) {
      yield put(transferCode());
    } else {
      yield put(getOpenIDByCode({ code: isArray(code) ? code.pop() : code }));
    }
  }
}
