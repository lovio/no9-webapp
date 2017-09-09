import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Menu from './menu';
import Exit from './exit';
// import * as uaHelper from 'helpers/ua';
// import imgAdBanner from 'images/adBanner.jpg';
// import { AdBanner } from 'ui';

// const iosLink = `${universalLink}?from=weixin`;

export default function HomeView({ signOut }) {
  return (
    <div>
      <Helmet>
        <title>账户</title>
      </Helmet>
      <Menu />
      <Exit signOut={signOut} />
    </div>
  );
}

HomeView.propTypes = {
  signOut: PropTypes.func.isRequired,
};
