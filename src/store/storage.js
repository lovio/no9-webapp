import persistState from 'redux-localstorage';
import Immutable from 'immutable';

const path = ['user'];

export default persistState(path, {
  key: 'no9-0.1.1',
  slicer: paths => state => state.getIn(paths),
  serialize: subset => JSON.stringify(subset.toJS()),
  deserialize: subset => Immutable.Map(JSON.parse(subset)),
  // todo 这里的initialState是createStore传入的，需要处理
  merge: (initialState = {}, persistedState) => Immutable.fromJS(initialState).mergeIn(path, persistedState),
});
