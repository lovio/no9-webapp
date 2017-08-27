import AuthenticatedHOC from '../../containers/auth/AuthenticatedHOC';
import Medal from './containers';
import MedalShare from './containers/share';

export default [
  {
    path: '/medal',
    exact: true,
    component: AuthenticatedHOC(Medal),
  }, {
    path: '/medal/share/:userId/:medalId?',
    exact: true,
    component: MedalShare,
  },
];
