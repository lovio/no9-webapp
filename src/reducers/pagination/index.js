import { combineReducers } from 'redux-immutable';
import { records, orders } from 'actions/order';
import createPaginationReducer from './utils';

export default combineReducers({
  records: createPaginationReducer(records, 'records', 20),
  orders: createPaginationReducer(orders, 'orders', 20),
});
