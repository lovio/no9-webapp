// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

// import { Iterable } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import persistState from './storage';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    // applyMiddleware(sagaMiddleware, createLogger({ stateTransformer })),
    // Add other middleware on this line...
    persistState,
    window.devToolsExtension ?
    window.devToolsExtension() : f => f,
    // add support for Redux dev tools
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispactch(END);

  return store;
}
