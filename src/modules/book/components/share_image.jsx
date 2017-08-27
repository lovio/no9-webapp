import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Image } from 'ui';

import imgClose from 'images/book-close.png';
import imgHeader from 'images/book-share-header.png';
import Loading from 'ui/loading';

export const Header = styled.div`
  padding-top: 0.01rem;
  height: 1.4rem;
  background-image: url('${imgHeader}');
  background-position: center;
  background-size: 3.75rem 1.4rem;
  background-repeat: no-repeat;
`;

export const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 0rem;
  padding-bottom: 0.5rem;
  background-color: rgba(0,0,0,.75);
`;

export const ImageBox = styled.div`
  position: relative;
  width: 80%;
  height: 4rem;
  margin-top: -0.45rem;
  padding: 0.1rem;
  border-radius: 0.04rem;
  background-color: #fff;
  font-size: 0.14rem;
  text-align: center;
`;

export const ImageContent = styled.div`
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
  }
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

export const Tip = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  background-color: #0CCD62;
  color: #fff;
  text-align: center;
  font-size: 0.14rem;
  line-height: 0.5rem;
`;

export default class Book extends Component {
  static propTypes = {
    shareImage: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack() {
    return () => {
      window.history.go(-1);
      this.setState({});
    };
  }

  stopPropagation() {
    return (event) => {
      event.stopPropagation();
      this.setState({});
    };
  }

  render() {
    const shareImage = this.props.shareImage;

    return (
      <div style={{ minHeight: '100%', backgroundColor: '#0CCD62' }}>
        <Helmet>
          <title>我正在参与智课斩托福送书活动，邀请你一起加入</title>
        </Helmet>

        <Header />

        <ModalBox onClick={this.goBack()}>
          <ImageBox onClick={this.stopPropagation()}>
            {
              shareImage.status !== 'SUCCESS'
                ? (
                  <div>
                    <div style={{ marginTop: '0.1rem' }}>分享图片加载中，请稍后...</div>
                    <Loading />
                  </div>
                ) : (
                  <ImageContent>
                    <Image src={shareImage.data} />
                  </ImageContent>
                )
            }

            <ModalClose onClick={this.goBack()}>
              <Image src={imgClose} />
            </ModalClose>
          </ImageBox>
        </ModalBox>

        <Tip>长按上方保存图片，并分享到朋友圈</Tip>
      </div>
    );
  }
}
