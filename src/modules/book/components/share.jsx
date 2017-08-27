import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Image } from 'ui';

import imgHeader from 'images/book-share-header.png';
import imgHeaderBottom from 'images/book-share-header-bottom.png';
import imgTitle from 'images/book-share-title.png';
import imgBooks from 'images/book-share-books.png';
import imgProcess from 'images/book-share-process.png';
import imgProcessApp from 'images/book-share-process-app.png';
import imgQRCodeApp from 'images/qrcode-app.png';
import Loading from 'ui/loading';
import { api } from '../../../../config.json';

export const Header = styled.div`
`;

export const HeaderTopBg = styled.div`
  position: relative;
  z-index: 1;

  img {
    width: 100%;
  }
`;

export const HeaderBottomBg = styled.div`
  position: relative;
  z-index: 3;
  margin-top: -0.6rem;

  img {
    width: 100%;
  }
`;

export const Avatar = styled.div`
  position: relative;
  z-index: 4;
  width: 0.45rem;
  height: 0.45rem;
  margin: 0 auto;
  margin-top: -0.45rem;
  border: 0.03rem solid #fff;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
  }
`;

export const Text = styled.div`
  margin-top: 0.15rem;
  color: #fff;

  div {
    display: block;
    text-align: center;
    font-size: 0.14rem;
  }
`;

export const BookImage = styled.div`
  position: relative;
  z-index: 2;
  margin-top: -1.2rem;
  text-align: center;

  img {
    height: 1.5rem;
  }
`;

export const Description = styled.div`
  margin-top: 0.25rem;

  img {
    width: 100%;
  }
`;

export const Invitation = styled.div`
  position: relative;
  padding: 0.15rem;
  margin: 0.1rem 0.25rem 0.2rem 0.25rem;
  background-color: rgba(0,0,0,0.15);
  border-radius: 0.08rem;

  div {
    display: block;
    text-align: center;
    color: #fff;
    font-size: 0.13rem;
    margin-top: 0.1rem;
  }
`;

export const InvitationCode = styled.div`
  width: 1.4rem;
  margin-bottom: 0.15rem;
  padding: 0.06rem 0;
  font-size: 0.14rem;
  text-align: center;
  background-color: #179E4E;
  border-bottom: 0.03rem solid #118743;
  color: #fff;
  border-radius: 0.05rem;
`;

export const QRCode = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  overflow: hidden;

  img {
    width: 100%;
    padding-bottom: 0.65rem;
  }
`;

export const Content = styled.div`
  margin: 0.05rem 0.25rem 0rem 0.25rem;
  padding: 0.15rem;
  background-color: rgba(0,0,0,0.15);
  border-radius: 0.04rem;
`;

export const ContentText = styled.div`
  font-size: 0.14rem;
  letter-spacing: 0.01rem;
  line-height: 0.2rem;
  color: #fff;
`;

export const Unlock = styled.div`
  width: 3rem;
  height: 0.55rem;
  margin: 0 auto;
  margin-top: 0.15rem;
  border: solid 0.02rem #fff;
  background: linear-gradient(to right, #F96645 0%, #FD8C28 100%);
  border-radius: 1rem;
  line-height: 0.53rem;
  text-align: center;
  color: #fff;
  font-size: 0.16rem;
  font-weight: bold;
`;

export const Process = styled.div`
  margin-top: 0.25rem;

  img {
    width: 100%;
  }
`;

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const book = this.props.book;

    if (book.status !== 'SUCCESS') {
      return <Loading />;
    }

    const bookId = book.data.get('id');
    const userId = book.data.getIn(['user', 'id']);
    // const nickname = book.data.getIn(['user', 'nickname']);
    const avatar = book.data.getIn(['user', 'avatar']);
    const invitationCode = book.data.get('invitationCode');

 // style={{ height: ((649 / 737) * parseInt(document.body.offsetWidth, 10)) - 1 }}
    return (
      <div style={{ minHeight: '100%', backgroundColor: '#0CCD62', paddingBottom: '0.01rem' }}>
        <Helmet>
          <title>我正在参与智课斩托福送书活动，邀请你一起加入</title>
        </Helmet>

        <Header>
          <HeaderTopBg><Image src={imgHeader} /></HeaderTopBg>
          <BookImage><Image src={book.data.get('image')} /></BookImage>
          <HeaderBottomBg><Image src={imgHeaderBottom} /></HeaderBottomBg>
          <Avatar><Image src={avatar} /></Avatar>

          <Text>
            <div>我在智课斩托福正参加“名校书单—邀请送书“活动，</div>
            <div>还差一位好友，赶紧来注册加入吧！</div>
          </Text>

          <Unlock>{this.props.isApp ? '长按下方二维码参与活动' : '长按识别二维码参与活动' }</Unlock>
        </Header>

        <Description>
          <Image src={imgTitle} />
          <Content>
            <Image src={imgBooks} />
          </Content>
        </Description>

        <Process>
          <Image src={this.props.isApp ? imgProcessApp : imgProcess} />
        </Process>

        {
          this.props.isApp ? (
            <Invitation style={{ height: '1.5rem', paddingLeft: '1.5rem' }}>
              <QRCode style={{ position: 'absolute', left: '0.15rem', margin: 0 }}>
                <Image src={imgQRCodeApp} />
              </QRCode>
              <div style={{ textAlign: 'left' }}>长按识别二维码下载APP，注册并输入邀请码</div>
              <InvitationCode>邀请码：{invitationCode}</InvitationCode>
            </Invitation>
          ) : (
            <Invitation>
              <QRCode>
                <Image src={`${api.zhanToefl}/mobile/wechat/temp-qrcode?channel1=送书活动&channel2=[${bookId},${userId}]`} />
              </QRCode>
              <div>长按识别二维码参与活动</div>
            </Invitation>
          )
        }
      </div>
    );
  }
}
