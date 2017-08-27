import createHistory from 'history/es/createHashHistory';
import omit from 'lodash-es/omit';
import isEmpty from 'lodash-es/isEmpty';
import replace from 'lodash-es/replace';
import startsWith from 'lodash-es/startsWith';
import includes from 'lodash-es/includes';
import qs from 'qs';

import { getSubjectId, getTypeBySubjectId } from 'helpers/fieldMappings';

import { site } from '../../config.json';

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

// 1. 口语，写作，跳转我的听力/写作页，不管status
// 2. 听力，阅读，跳转报告页
// /report/:subject/:exerciseId 阅读和听力, subject, not id
// type 有两种，一种是records, 另外一种是做题，只判断records
// 阅读和听力带p=cover
export function getTiUrl({
  subjectId, practiceId, questionId, status, exerciseId, type,
}) {
  const TI_URL = `${site.ti}/practice/${practiceId}/question/${questionId}`;
  let url = TI_URL;
  const isReadingAndListening = includes([getSubjectId('reading'), getSubjectId('listening')], +subjectId);
  if (type === 'records') {
    if (+status === 1) {
      url = isReadingAndListening ?
        `${site.ti}/report/${getTypeBySubjectId(+subjectId)}/${exerciseId}` :
        `${TI_URL}?${qs.stringify({ index: 2 })}`;
    } else {
      url = `${TI_URL}?${qs.stringify({ exerciseId })}`;
    }
  } else if (isReadingAndListening) {
    if (+status === 1) {
      url = `${site.ti}/report/${getTypeBySubjectId(+subjectId)}/${exerciseId}`;
    } else if (exerciseId) {
      url = `${TI_URL}?${qs.stringify({ exerciseId })}`;
    } else {
      url = `${TI_URL}?${qs.stringify({ p: 'cover' })}`;
    }
  } else {
    url = TI_URL;
  }
  // 旧规则, 和新规则的区别是，新规则在列表不管状态，全部跳转首页。
  // if (+status === 1) {
  //   url = isReadingAndListening ?
  //     `${site.ti}/report/${getTypeBySubjectId(+subjectId)}/${exerciseId}` :
  //     `${TI_URL}?${qs.stringify({ index: 2 })}`;
  // } else if (exerciseId) {
  //   url = `${TI_URL}?${qs.stringify({ exerciseId })}`;
  // } else if (isReadingAndListening) {
  //   url = `${TI_URL}?${qs.stringify({ p: 'cover' })}`;
  // }
  return `${location.protocol}${url}`;
}

export function getSearch(searchStr) {
  return qs.parse(replace(searchStr, /^\?/, ''));
}

export default history;
