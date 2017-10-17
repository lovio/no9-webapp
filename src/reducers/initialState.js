import Immutable from 'immutable';

const DEFAULT_PAGINATION = {
  isLoading: false,
  totalPage: 0,
  pageSize: 20,
  pageNo: 1,
  hasMore: true,
};

/* eslint-disable max-len */
// 对于闪购或者搜索结果都是用products
export default Immutable.fromJS({
  // 要改成其他名字，比如sesstion
  user: {},
  common: {
    toasts: {},
    modal: {},
    confirm: {},
  },
  pagination: {
    records: DEFAULT_PAGINATION,
  },
  extra: {
    cities: [],
    zones: [],
  },
  mine: {
    cards: [],
    records: [],
  },
});
