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
    orders: DEFAULT_PAGINATION,
  },
  extra: {
    cities: [],
    zones: [],
    carports: {
      data: [],
      isLoading: false,
    },
  },
  order: {
    isLoading: false,
    data: {},
  },
  mine: {
    openid: '',
    cards: [],
    records: [],
    orders: [],
    summries: [],
    relations: {
      isLoading: false,
      data: {},
    },
    card: 0,
  },
});
