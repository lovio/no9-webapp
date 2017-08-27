import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { Image, BasicOverflowContainer } from 'ui';

import imgBgShare from 'images/share-bg.jpg';
import imgQrcode from 'images/share.jpg';


import Avatar from 'ui/avatar';

const Container = styled(BasicOverflowContainer)`
  background-color: #F7F8FA;
`;

const AvatarWithBorder = styled(Avatar)`
  display: inline-block;
  border: 0.02rem solid white;
  margin-bottom: 0.06rem;
`;

const Head = styled.div`
  background-image: url('${imgBgShare}');
  background-position: top;
  background-size: 3.75rem 1.32rem;
  background-repeat: no-repeat;
  padding-top: 1rem;
  text-align: center;

  p {
    margin: 0;
    font-size: 0.12rem;
    line-height: 0.17rem;
    color: #2E3236;
    letter-spacing: 0;
  }
`;

const QRcode = styled.div`
  margin-top: 0.15rem;
  img {
    width: 100%;
  }
`;

export default function ShareView({ share }) {
  return (
    <Container>
      <Helmet>
        <title>智课斩托福</title>
      </Helmet>
      <Head>
        <AvatarWithBorder src={share.get('avatar')} />
        <p>您的好友{share.get('nickname')}</p>
        <p>邀请你加入智课斩托福!</p>
      </Head>
      <QRcode>
        <Image src={imgQrcode} alt="智课斩托福公众号" />
      </QRcode>
    </Container>
  );
}

ShareView.propTypes = {
  share: PropTypes.object.isRequired,
};
