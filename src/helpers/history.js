import createHistory from 'history/es/createHashHistory';
import omit from 'lodash-es/omit';
import isEmpty from 'lodash-es/isEmpty';
import replace from 'lodash-es/replace';
import startsWith from 'lodash-es/startsWith';
import qs from 'qs';


const history = createHistory();

// remove code, state, and token
export function getSafePath() {
  const { pathname, search, hash } = history.location;
  const searchObj = omit(qs.parse(replace(search, /^\?/, '')), ['code', 'state', 'token']);
  const newSearch = isEmpty(searchObj) ? '' : `?${qs.stringify(searchObj)}`;
  const pathWithNoCode = [pathname, newSearch, hash].join('');
  return pathWithNoCode;
}

// 如果参数中没有redirectUrl或者没有传url参数，则不跳转
export function redirect(url, isReplace) {
  const redirectUrl = qs.parse(replace(history.location.search, /^\?/, '')).redirectUrl || url;
  if (redirectUrl) {
    if (startsWith(redirectUrl, 'http')) {
      location.replace(redirectUrl);
    } else {
      const func = isReplace ? 'replace' : 'push';
      history[func](redirectUrl);
    }
  }
}

export function getSearch(searchStr) {
  return qs.parse(replace(searchStr, /^\?/, ''));
}

export default history;
