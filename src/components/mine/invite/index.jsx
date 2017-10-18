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
  padding-top: 0.3rem;
  text-align: center;
  canvas {
    width: 1.15rem !important;
    height: 1.15rem !important;
  }
`;

const Name = styled.p`
  font-size: 0.18rem;
  color: #4a4a4a;
  line-height: 0.25rem;
  min-height: 0.25rem;
`;

const No = styled.p`
  font-size: 0.12rem;
  color: #4a4a4a;
  line-heght: 0.2rem;
  margin-bottom: 0.2rem;
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
          <No>用户编码：{user.get('id')}</No>
          <QRCode value={getInviteUrl(user.get('referrerCode'))} />
        </QRCodeContainer>
      </Container>
    </div>
  );
}

MineView.propTypes = {
  user: PropTypes.object.isRequired,
};
