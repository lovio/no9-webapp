import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

// import pagination from './pagination';

import common from './common';
import user from './user';
import extra from './extra';

const rootReducer = combineReducers({
  common,
  user,
  extra,
  // pagination,
  // payment,
  form: formReducer,
});

export default rootReducer;
