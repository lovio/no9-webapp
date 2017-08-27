import { put, select } from 'redux-saga/effects';
import history, { getSearch } from 'helpers/history';
import { inWechat } from 'helpers/ua';
import { transferCode, initWechat } from 'actions/wx';
import { checkWechatBindStatus, registerToken } from 'actions/auth';
import includes from 'lodash-es/includes';

// 包含share的都走验证流程
export function* wechatOauth() {
  const { pathname } = history.location;
  const token = getSearch(history.location.search).token;
  if (token) {
    // url中直接添加token querystring
    yield put(registerToken({ token }));
  } else if (inWechat && !includes(pathname, 'share')) {
    const userInfo = yield select(state => state.getIn(['user', 'info']));
    const search = getSearch(history.location.search);
    if (
      // 没有unionId的情况
      !userInfo.get('unionId')
      // 有unionID，但是没有isAuthorized
      // || !userInfo.has('isAuthorized')
      // || userInfo.get('isAuthorized') === false
      || !userInfo.get('isAuthorized')
    ) {
      // todo 只判断token是有问题的。。。
      // const search = getSearch(history.location.search);
      const code = search.code;
      if (!code) {
        yield put(transferCode());
      } else {
        yield put(checkWechatBindStatus({ code, type: search.state }));
      }
    } else {
      yield put(initWechat({ type: 'image' }));
      yield put(initWechat({ type: 'share' }));
    }
  }
}
