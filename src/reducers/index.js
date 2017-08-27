import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { reducers } from 'modules';

import pagination from './pagination';

import user from './user';
import common from './common';
import share from './share';

const rootReducer = combineReducers({
  ...reducers,
  common,
  user,
  share,
  pagination,
  // payment,
  form: formReducer,
});

export default rootReducer;
