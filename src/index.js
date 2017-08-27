/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import 'helpers/fixHistoryBack';
import 'helpers/statics';

// initialize redux store
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import App from './containers/App';

const container = document.getElementById('app');

const store = configureStore();

store.runSaga(rootSaga);

render(
  <App store={store} />,
  container,
);
