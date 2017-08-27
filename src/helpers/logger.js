import get from 'lodash-es/get';
import isFunction from 'lodash-es/isFunction';

let userId = '';

export function setUserId(id = '') {
  userId = id;
}

export function log({ eventType = '点击', ...rest }) {
  const data = {
    userId,
    eventType,
    ...rest,
  };
  const logFunc = get(window, 'ssAccess.log');
  if (isFunction(logFunc)) {
    logFunc(data);
  }
}

const subjectMappings = {
  reading: 'READ',
  listening: 'LISTEN',
  speaking: 'TALK',
  writing: 'WRITE',
};

export function getEventDetailBySubject(prefix, subject) {
  return `${prefix}_${subjectMappings[subject]}`;
}
