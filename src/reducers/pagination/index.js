import { combineReducers } from 'redux-immutable';
import { realGetCreditRecords } from 'modules/credit/actions';
import createPaginationReducer from './utils';

export default combineReducers({
  credits: createPaginationReducer(realGetCreditRecords, 'credits', 20),
});
