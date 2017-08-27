import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import imgShareTitle from 'images/share-title.png';
import iconQuestion from 'images/icon-question.png';
import iconCorrection from 'images/icon-correction.png';
import iconTime from 'images/icon-time.png';
import imgQRCodeApp from 'images/qrcode-app.png';
import { api } from '../../../../config.json';

export const Ad = styled.div`
  background-color: #fff;
  margin: 0.1rem 0.15rem 0 0.15rem;
  border-radius: 0.03rem;
`;

export const Title = styled.div`
  text-align: center;
  padding: 0.22rem 0;

  img {
    width: 2.17rem;
  }
`;

export const Content = styled.div`
  padding: 0.2rem;
  border-top: 1px solid #F7F8FA;
`;

export const Item = styled.div`
  width: 2rem;
  margin: 0 auto;
  margin-top: 0.12rem;
  font-size: 0.16rem;
  color: #8F9DA5;

  img {
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 0.1rem;
    vertical-align: -0.06rem;
  }
`;

export const Invitaion = styled.div`
  margin-top: 0.25rem;
  padding-bottom: 0.2rem;

  span {
    display: block;
    text-align: center;
    color: #666;
    font-size: 0.13rem;
    margin-top: 0.1rem;
  }
`;

export const QRCode = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 auto;
  padding: 0.06rem;
  background: rgba(0,0,0,0.15);
  border-radius: 0.05rem;
  overflow: hidden;

  img {
    width: 100%;
    padding-bottom: 0.65rem;
  }
`;

export default class Container extends Component {
  static propTypes = {
    isApp: PropTypes.string.isRequired,
    medalId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Ad>
          <Title>
            <Image src={imgShareTitle} />
          </Title>
          <Content>
            <Item>
              <Image src={iconQuestion} />
              题库极全，分类超细
            </Item>
            <Item>
              <Image src={iconCorrection} />
              小白都能看的懂得解析
            </Item>
            <Item>
              <Image src={iconTime} />
              五分钟估分，定位短板
            </Item>
          </Content>
        </Ad>

        <Invitaion>
          <QRCode>
            <Image src={this.props.isApp ? imgQRCodeApp : `${api.zhanToefl}/mobile/wechat/temp-qrcode?channel1=勋章分享&channel2=[${this.props.medalId || 0},${this.props.userId}]`} />
          </QRCode>
          <span>{ this.props.isApp ? '长按识别二维码下载智课斩托福' : '长按识别二维码加入智课斩托福' }</span>
        </Invitaion>
      </div>
    );
  }
}
