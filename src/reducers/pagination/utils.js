import { combineReducers } from 'redux-immutable';
import { handleActions } from 'redux-actions';
import { clearPagination } from 'actions/common';
import initialState from '../initialState';

  // totalPage: 0,
  // pageSize: 20,
  // page: 1,
  // isLoading: false,

export default (requestTypes, reducerField, _pageSize) => {
  const totalPage = handleActions({
    [requestTypes.success]: (state, { payload }) => payload.totalPage,
  }, initialState.getIn(['pagination', reducerField, 'totalPage']));

  const page = handleActions({
    [requestTypes.success]: (state, { payload }) => payload.page,
  }, initialState.getIn(['pagination', reducerField, 'page']));

  const pageSize = handleActions({
    [requestTypes.success]: (state, { payload }) => payload.pageSize || _pageSize,
  }, _pageSize || initialState.getIn(['pagination', reducerField, 'pageSize']));

  const hasMore = handleActions({
    [requestTypes.success]: (state, { payload }) => payload.page < payload.totalPage,
    [clearPagination]: (state, { payload }) => {
      if (payload === reducerField) {
        return true;
      }
      return state;
    },
  }, initialState.getIn(['pagination', reducerField, 'hasMore']));

  const isLoading = handleActions({
    [requestTypes.request]: () => true,
    [requestTypes.success]: () => false,
    [requestTypes.failure]: () => false,
  }, initialState.getIn(['pagination', reducerField, 'isLoading']));

  return combineReducers({ totalPage, page, pageSize, hasMore, isLoading });
};
