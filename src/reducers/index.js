import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import pagination from './pagination';

import common from './common';
import user from './user';
import extra from './extra';
import mine from './mine';
import order from './order';

const rootReducer = combineReducers({
  common,
  user,
  extra,
  mine,
  pagination,
  order,
  form: formReducer,
});

export default rootReducer;
