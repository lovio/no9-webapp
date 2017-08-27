import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { showPanel } from 'helpers/meiqia';
import imgAdCustom from 'images/adCustom.jpg';
import { AdBanner, Image } from 'ui';
import { log } from 'helpers/logger';

import Profile from './profile';

import { Container, SignOut } from './components';

export default function UserView(props) {
  return (
    <Container>
      <Helmet>
        <title>我的资料</title>
      </Helmet>
      <Profile {...props} />
      <SignOut
        onClick={() => {
          log({ eventDetail: 'PERSONAL_SINGOUT' });
          props.signOut();
        }}
      >退出登录</SignOut>
      <AdBanner onClick={() => showPanel()}>
        <Image src={imgAdCustom} alt="ad" />
      </AdBanner>
    </Container>
  );
}

UserView.propTypes = {
  signOut: PropTypes.func.isRequired,
};
