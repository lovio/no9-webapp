import { put } from 'redux-saga/effects';
import history, { getSearch } from 'helpers/history';
import { inWechat } from 'helpers/ua';
import { transferCode, getOpenIDByCode } from 'actions/wx';
// import { checkWechatBindStatus, registerToken } from 'actions/auth';
// import includes from 'lodash-es/includes';

// 包含share的都走验证流程
export function* wechatOauth() {
  // const { pathname } = history.location;
  if (inWechat) {
    const search = getSearch(history.location.search);
    const code = search.code;
    if (!code) {
      yield put(transferCode());
    } else {
      yield put(getOpenIDByCode({ code }));
    }
  }
  // } else if (inWechat && !includes(pathname, 'share')) {
  //   } else {
  // yield put(initWechat({ type: 'image' }));
  // yield put(initWechat({ type: 'share' }));
  // }
  // }
}
