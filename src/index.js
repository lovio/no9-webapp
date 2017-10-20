/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import initReactFastclick from 'react-fastclick';

// initialize redux store
import configureStore from './store/configureStore';
import rootSaga from './sagas';

import App from './containers/App';

initReactFastclick();

const container = document.getElementById('app');

const store = configureStore();

store.runSaga(rootSaga);

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  container,
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default; // eslint-disable-line
    render(
      <AppContainer>
        <NewApp store={store} />
      </AppContainer>,
      container,
    );
  });
}
