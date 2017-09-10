import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

const Container = styled.div`
  padding: 0.5rem 0.45rem;
  text-align: center;
`;

const Desc = styled.p`
  margin-top: 0.4rem;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.14rem;
`;

export default function MineView({ referrerCode }) {
  return (
    <div>
      <Helmet>
        <title>账户</title>
      </Helmet>
      <Container>
        <QRCode value={referrerCode} />
        <Desc>
          <p>您的邀请码为{referrerCode}</p>
          <p>请截图后转发</p>
        </Desc>
      </Container>
    </div>
  );
}

MineView.propTypes = {
  referrerCode: PropTypes.string.isRequired,
};
