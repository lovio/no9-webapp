import AuthenticatedHOC from '../../containers/auth/AuthenticatedHOC';
import Credit from './containers';
import CreditRule from './containers/rule';

export default [
  {
    path: '/credit',
    exact: true,
    component: AuthenticatedHOC(Credit),
  }, {
    path: '/credit/rule',
    exact: true,
    component: CreditRule,
  },
];
