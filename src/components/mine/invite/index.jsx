import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import QRCode from 'qrcode.react';

import imgInviteBg from './invite-bg.jpg';

function getInviteUrl(referrerCode) {
  return `${location.origin}/#/signup?referrerCode=${referrerCode}`;
}

const Container = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const QRCodeContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  padding-top: 2.4rem;
  padding-left: 1.96rem;
  canvas {
    width: 1.1rem !important;
    height: 1.1rem !important;
  }
`;

const Name = styled.p`
  font-size: 0.12rem;
  color: #4a4a4a;
  line-height: 0.16rem;
  min-height: 0.2rem;
`;

const No = styled.p`
  font-size: 0.12rem;
  color: #4a4a4a;
  line-heght: 0.16rem;
`;

export default function MineView({ user }) {
  return (
    <div>
      <Helmet>
        <title>账户</title>
      </Helmet>
      <Container>
        <img src={imgInviteBg} alt="" />
        <QRCodeContainer>
          <Name>姓名：{user.get('name') ? user.get('name') : '***'}</Name>
          <No>邀请码：{user.get('referrerCode')}</No>
          <QRCode value={getInviteUrl(user.get('referrerCode'))} />
        </QRCodeContainer>
      </Container>
    </div>
  );
}

MineView.propTypes = {
  user: PropTypes.object.isRequired,
};
