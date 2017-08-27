import AuthenticatedHOC from 'containers/auth/AuthenticatedHOC';
import Study from './containers';

// 目前还没有想好是否有必要
export default [
  {
    path: '/study/:type',
    exact: true,
    component: AuthenticatedHOC(Study),
  },
];
