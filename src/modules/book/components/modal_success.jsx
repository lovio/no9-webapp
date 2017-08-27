import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import imgClose from 'images/book-close.png';
import imageSuccess from 'images/book-exchange-success.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 900;
  background: rgba(0,0,0,0.75);
`;

const ModalBox = styled.div`
  position: relative;
  background: #fff;
  margin: 0 0.15rem;
  margin-top: -0.45rem;
  padding: 0.15rem;
  border-radius: 0.05rem;
`;

export const Title = styled.div`
  font-size: 0.16rem;
`;

export const ModalClose = styled.div`
  position: absolute;
  left: 0;
  bottom: -0.45rem;
  width: 100%;
  text-align: center;

  img {
    height: 0.45rem;
  }
`;

export const SuccessImage = styled.div`
  margin-top: 0.1rem;
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.14rem;
    color: #99A3A5;
  }
`;

export const SuccessText = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 0.1rem;
  padding-top: 0.15rem;
  border-top: 1px solid #EDEEF0;
  font-size: 0.14rem;
`;

export default class ModalExchange extends Component {
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <ModalBox>
          <SuccessImage>
            <Image src={imageSuccess} />
            <span>欢迎注册智课斩托福！</span>
          </SuccessImage>
          <SuccessText>
            您已成功接受来自您好友的邀请，离获取宝书又近了一步，快去告诉ta吧。
          </SuccessText>

          <ModalClose onClick={() => this.props.hideModal()}>
            <Image src={imgClose} />
          </ModalClose>
        </ModalBox>
      </Container>
    );
  }
}
