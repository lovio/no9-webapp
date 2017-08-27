import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from 'reducers/initialState';
import * as actions from './actions';

export default combineReducers({
  // 图书
  book: handleActions({
    [actions.getBook]: () => ({ status: 'LOADING' }),
    [actions.realGetBook.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetBook.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['book', 'book'])),

  // 图书列表
  books: handleActions({
    [actions.getBooks]: () => ({ status: 'LOADING' }),
    [actions.realGetBooks.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetBooks.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['book', 'books'])),

  // 分享图片
  shareImage: handleActions({
    [actions.getShareImage]: () => ({ status: 'LOADING' }),
    [actions.realGetShareImage.success]: (state, { payload }) => ({
      status: 'SUCCESS',
      data: Immutable.fromJS(payload),
    }),
    [actions.realGetShareImage.failure]: (state, { payload }) => ({
      status: 'FAILURE',
      data: Immutable.fromJS(payload),
    }),
  }, initialState.getIn(['book', 'shareImage'])),
});
