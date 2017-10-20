import { combineReducers } from 'redux-immutable';
import { handleActions } from 'redux-actions';
import { clearPagination } from 'actions/common';
import size from 'lodash-es/size';
import initialState from '../initialState';

export default (requestTypes, reducerField, pageCount) => {
  // const totalPage = handleActions(
  //   {
  //     [requestTypes.success]: (state, { payload }) => payload.totalPage,
  //   },
  //   initialState.getIn(['pagination', reducerField, 'totalPage']),
  // );

  const pageNo = handleActions(
    {
      [requestTypes.success]: state => state + 1,
      [clearPagination]: () => 1,
    },
    initialState.getIn(['pagination', reducerField, 'pageNo']),
  );

  // const pageSize = handleActions(
  //   {
  //     [requestTypes.success]: (state, { payload }) => payload.pageSize || _pageSize,
  //   },
  //   _pageSize || initialState.getIn(['pagination', reducerField, 'pageSize']),
  // );

  const hasMore = handleActions(
    {
      [requestTypes.success]: (state, { payload }) => size(payload) === pageCount,
      [clearPagination]: (state, { payload }) => {
        if (payload === reducerField) {
          return true;
        }
        return state;
      },
    },
    initialState.getIn(['pagination', reducerField, 'hasMore']),
  );

  const isLoading = handleActions(
    {
      [requestTypes.request]: () => true,
      [requestTypes.success]: () => false,
      [requestTypes.failure]: () => false,
    },
    initialState.getIn(['pagination', reducerField, 'isLoading']),
  );

  return combineReducers({ pageNo, hasMore, isLoading });
};
