import { put, call, select } from 'redux-saga/effects';
import isObject from 'lodash-es/isObject';
import assign from 'lodash-es/assign';
import get from 'lodash-es/get';

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
// 用法，知道bind的用法，就懂了
export function* fetchEntity(entity, apiFn, params, needToken) {
  let token;
  // 是不是有更好的保存token的地方？
  if (needToken) {
    token = yield select(state => state.getIn(['user', 'token']));
  }
  yield put(entity.request(params));
  const { response, error } = yield call(apiFn, token ? assign({}, params, { token }) : params);
  // response可以是0， 但是error一定不是
  if (error) {
    yield put(entity.failure({ error, params }));
  } else {
    yield put(entity.success({ response, params }));
  }
}

// actions是callback actions
// params contains of api and actions
export function* formRequest(params, action) {
  const { payload: { values, resolve, reject } } = action;
  const { actions, api, needToken, tokenKey } = params;
  let token;
  // 是不是有更好的保存token的地方？
  if (needToken) {
    token = yield select(state => state.getIn(['user', 'token']));
  }
  const formData = token ? assign({}, values, { [tokenKey || 'token']: token }) : values;
  const { response, error } = yield call(api, formData);
  if (error) {
    // 返回空
    const { data } = error;
    const errorMsg = (isObject(data) && (data.message || data.msg)) || '出错了！';
    if (get(actions, 'failure')) {
      yield put(
        actions.failure({
          msg: errorMsg,
          data,
        }),
      );
      return reject();
    }
    // 通用错误提示
    return reject({ _error: errorMsg, error: data });
  }
  if (get(actions, 'success')) {
    // provide values
    yield put(actions.success({ response, params: values }));
  }
  return resolve(response);
}
