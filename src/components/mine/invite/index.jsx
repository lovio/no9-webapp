import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import QRCode from 'qrcode.react';

import imgInviteBg from './invite-bg.jpg';

function getInviteUrl(referrerCode) {
  return `${location.origin}/#/login?referrerCode=${referrerCode}`;
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
  padding-top: 0.85rem;
  text-align: center;
  canvas {
    width: 1.26rem !important;
    height: 1.26rem !important;
  }
`;

export default function MineView({ referrerCode }) {
  return (
    <div>
      <Helmet>
        <title>账户</title>
      </Helmet>
      <Container>
        <img src={imgInviteBg} alt="" />
        <QRCodeContainer>
          <QRCode value={getInviteUrl(referrerCode)} />
        </QRCodeContainer>
      </Container>
    </div>
  );
}

MineView.propTypes = {
  referrerCode: PropTypes.string.isRequired,
};
