import AuthenticatedHOC from '../../containers/auth/AuthenticatedHOC';
import Book from './containers';
import BookShare from './containers/share';
import BookShareImage from './containers/share_image';

export default [
  {
    path: '/book',
    exact: true,
    component: AuthenticatedHOC(Book),
  }, {
    path: '/book/share/:bookId/:userId',
    exact: true,
    component: BookShare,
  }, {
    path: '/book/share/image/:bookId/:userId',
    exact: true,
    component: BookShareImage,
  },
];
