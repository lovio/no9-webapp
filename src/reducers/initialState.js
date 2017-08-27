import Immutable from 'immutable';

const DEFAULT_PAGINATION = {
  isLoading: false,
  totalPage: 0,
  pageSize: 20,
  page: 1,
  hasMore: true,
};

/* eslint-disable max-len */
// 对于闪购或者搜索结果都是用products
export default Immutable.fromJS({
  // 要改成其他名字，比如sesstion
  user: {
    // 用户信息要和认证信息分开处理
    // 不然token失效会很难处理
    info: {},
    // null为初始值，未获取，不为0，不展示
    credits: 0,
    intention: {},
    answerCount: 0,
    checkin: {
      count: 0,
      isSignIn: 0,
    },
    checkins: {},
    abroadPlan: {},
    capabilityTest: {
      isLoading: false,
      data: [],
    },
    // 绑定用户时，保存中间信息，邮箱和手机号。可以考虑用wizard form来重构
    bind: {},
    // 解绑相关的信息存放在里面
    unbind: {},
  },
  common: {
    toasts: {},
    modal: {},
    confirm: {},
    config: {},
    user: {},
    medal: {},
  },
  pagination: {
    credits: DEFAULT_PAGINATION,
  },
  ti: {
    counts: {},
    tabs: [],
    questionPackages: {
      isLoading: false,
      data: [],
    },
    topics: {
      isLoading: false,
      data: [],
    },
    topic: {
      isLoading: false,
      data: {},
    },
    lately: {
      isLoading: false,
      data: {},
    },
  },
  study: {
    records: {
      isLoading: false,
      data: {},
    },
  },
  share: {},
  book: {
    book: {},
    books: {},
    shareImage: {},
  },
  credit: {
    records: [],
  },
  medal: {
    medal: {},
    medals: {},
  },
});
