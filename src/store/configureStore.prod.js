import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
// import persistState from './storage';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      // persistState,
    ),
  );
  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);
  return store;
}
