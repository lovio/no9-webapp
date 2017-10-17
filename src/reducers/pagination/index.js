import { combineReducers } from 'redux-immutable';
import { records } from 'actions/order';
import createPaginationReducer from './utils';

export default combineReducers({
  records: createPaginationReducer(records, 'records', 20),
});
