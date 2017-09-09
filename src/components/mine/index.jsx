import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Card from './card';
import Menu from './menu';
import Exit from './exit';

export default function MineView({ user, signOut }) {
  return (
    <div>
      <Helmet>
        <title>账户</title>
      </Helmet>
      <Card user={user} />
      <Menu />
      <Exit signOut={signOut} />
    </div>
  );
}

MineView.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};
