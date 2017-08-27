import { take, call, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as userActions from 'actions/user';
import Mitt from 'helpers/mitt';
import * as apis from 'helpers/api';

import { fetchEntity } from './utils';

const uploadShareStats =
  fetchEntity.bind(null, userActions.shareStats, apis.uploadShareStats);

const uploadMeiqiaStats =
  fetchEntity.bind(null, userActions.meiqiaStats, apis.uploadMeiqiaStats);

function createWXChannel(emitter) {
  return eventChannel((emit) => {
    emitter.on('*', (type, event) => emit({
      type, event,
    }));

    const unsubscribe = () => { };

    return unsubscribe;
  });
}
export function* watchWXEvent() {
  const chan = yield call(createWXChannel, Mitt);
  for (; ;) {
    const { type, event } = yield take(chan);
    if (type === 'share') {
      if (event.result === 'success') {
        yield fork(uploadShareStats, {
          destination: event.type,
        }, true);
      }
    } else if (type === 'meiqia') {
      yield fork(uploadMeiqiaStats, {}, true);
    }
  }
}
