import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

// const t = createDataReducer({
//   loadAction: 'LOAD_DATA',
//   fetchTypes: TEACHERS,
//   initialState: ['t', 'teachers'],
//   loadFunc: () => Immutable.List(),
//   successFunc: (state) => true
// })
export const createDataReducer = (params) => {
  const {
    loadAction,
    fetchTypes,
    initialStatePosition,
    loadFunc,
    successFunc,
  } = params;

  return combineReducers({
    data: handleActions({
      [loadAction]: loadFunc || (() => Immutable.Map()),
      [fetchTypes.success]: successFunc || ((state, { payload }) => Immutable.fromJS(payload)),
    }, initialState.getIn([...initialStatePosition, 'data'])),
    isLoading: handleActions({
      [fetchTypes.request]: () => true,
      [fetchTypes.success]: () => false,
      [fetchTypes.failure]: () => false,
    }, initialState.getIn([...initialStatePosition, 'isLoading'])),
  });
};

export default {
  createDataReducer,
};
