import map from 'lodash-es/map';
import flatMap from 'lodash-es/flatMap';
import fromPairs from 'lodash-es/fromPairs';

import Empty from 'ui/empty';

const modules = ['ti', 'book', 'credit', 'medal', 'study'];

/* eslint-disable global-require, import/no-dynamic-require */
export const sagas = map(modules, m => require(`./${m}/sagas`));

export const reducers = fromPairs(map(modules, m => [m, require(`./${m}/reducers`).default]));

// 要在这里处理404，不然会失败
export const routes = flatMap(modules, m => require(`./${m}/routes`).default);

routes.push({
  component: Empty,
});
