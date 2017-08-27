import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import * as uaHelper from 'helpers/ua';
// import imgAdBanner from 'images/adBanner.jpg';
// import { AdBanner } from 'ui';

import BookActivity from 'components/common/bookActivity';
// import { universalLink } from '../../../config.json';
import ProfileView from '../common/profile';
import Menu from './menu';

// const iosLink = `${universalLink}?from=weixin`;

export default function HomeView({ user }) {
  return (
    <div>
      <Helmet>
        <title>我的</title>
      </Helmet>
      <ProfileView white user={user} loggerEventDetailPrefix="PERSONAL" />
      <BookActivity />
      <Menu />
    </div>
  );
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
};

// {
//   !user.getIn(['capabilityTest', 'data']).size && (
//     <AdBanner
//       onClick={
//         () => {
//           let url;
//           if (uaHelper.inAndroid) {
//             url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.smartstudy.zhantoefl';
//           } else {
//             url = iosLink;
//           }
//           location.href = url;
//         }
//       }
//     >
//       <img src={imgAdBanner} alt="ad" />
//     </AdBanner>
//   )
// }
