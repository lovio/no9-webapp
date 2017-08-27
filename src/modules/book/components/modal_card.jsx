import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import querystring from 'querystring';
import { Link } from 'react-router-dom';
import { Image } from 'ui';

import imgStarFull from 'images/book-star-full.png';
import imgStarEmpty from 'images/book-star-empty.png';
import imgClose from 'images/book-close.png';
import { site } from '../../../../config.json';

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
  padding: 0 0.15rem;
  z-index: 900;
  background: rgba(0,0,0,0.75);
`;

const ModalBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: -0.45rem;
  padding: 0.15rem;
  border-radius: 0.05rem;
  background: #fff;

  a {
    text-decoration: none;
  }
`;

export const Info = styled.div`
  position: relative;
  height: 1.05rem;
  padding-left: 0.9rem;
`;

export const BookImage = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  img {
    display: inline-block;
    width: 0.8rem;
    height: 1.05rem;
  }
`;

export const Title = styled.div`
  width: 100%;
  font-size: 0.16rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const InfoProperty = styled.div`
  display: flex;
  position: relative;
  margin-top: 0.04rem;
  font-size: 0.12rem;

  img {
    display: inline-block;
    margin-right: 0.05rem;
    width: 0.14rem;
    border-radius: 0.14rem;
  }
`;

export const InfoTitle = styled.div`
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const Description = styled.div`
  margin-top: 0.15rem;
  font-size: 0.14rem;
  font-style: italic;

  span {
    display: block;
    margin-bottom: 0.05rem;
    color: #909FA6;
    font-style: normal;
    font-size: 0.12rem;
  }
`;

export const Button = styled.div`
  height: 0.46rem;
  margin-top: 0.15rem;
  background-color: #FD6838;
  background: linear-gradient(to right, #FF663C 0%, #FF8901 100%);
  border-radius: 0.03rem;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.16rem;
  color: #fff;
`;

export const Property = styled.div`
  margin-top: 0.14rem;
  font-size: 0.12rem;

  span {
    display: inline-block;
    width: 0.74rem;
    color: #909FA6;
  }
`;

export const ProcessBar = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 0.1rem;
  background-color: #EAEFF2;
  border-radius: 0.1rem;
  overflow: hidden;
  vertical-align: -0.01rem;

  span {
    display: inline-block;
    background-color: #0FDA6B;
    height: 0.1rem;
  }
`;

export const Exchange = styled.div`
  float: right;
`;

export const Avatars = styled.div`
  display: inline-block;

  img {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: -0.05rem;
    margin-right: 0.05rem;
  }
`;

export const Process = styled.div`
  display: inline-block;
  margin-left: 0.06rem;
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

export default class ModalCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    hideDetail: PropTypes.func.isRequired,
    showExchange: PropTypes.func.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderShareLink(book, mobileUrl) {
    let buttonText;
    switch (book.status) {
      case 'AVAILABLE':
        buttonText = '立即兑换';
        break;
      case 'UNAVAILABLE':
        buttonText = '立即邀请';
        break;
      case 'COMPLETED':
        buttonText = '分享晒晒我的成就';
        break;
      default:
        break;
    }

    return this.props.isApp ? (
      <a href={mobileUrl}><Button>{buttonText}</Button></a>
    ) : (
      <Link
        to={`/book/share/image/${book.id}/${book.userId}`}
      >
        <Button>{buttonText}</Button>
      </Link>
    );
  }

  render() {
    const book = this.props.book;
    const hideDetail = this.props.hideDetail;
    const showExchange = this.props.showExchange;

    const mobileParams = {
      title: '我在参加智课斩托福送书活动，名额有限，邀你一起来领！送TPO49-53~',
      desc: '智课斩托福送书啦～3本好书，限量免费，速领！',
      link: `${site.zhanToefl}/#/book/share/${book.id}/${book.userId}?isApp=1`,
      imgUrl: book.image,
    };
    const mobileUrl = `mobile://share?${querystring.stringify(mobileParams)}`;

    let buttonText;
    switch (book.status) {
      case 'AVAILABLE':
        buttonText = '立即兑换';
        break;
      case 'UNAVAILABLE':
        buttonText = '立即邀请';
        break;
      case 'COMPLETED':
        buttonText = '分享晒晒我的成就';
        break;
      default:
        break;
    }

    return (
      <Container>
        <ModalBox>
          <Info>
            <BookImage>
              <Image src={book.image} />
            </BookImage>
            <Title>{book.title}</Title>
            <InfoProperty>
              <InfoTitle>宝书能力值：</InfoTitle>
              <InfoContent>
                <Image src={book.capabilityIndex > 0 ? imgStarFull : imgStarEmpty} />
                <Image src={book.capabilityIndex > 1 ? imgStarFull : imgStarEmpty} />
                <Image src={book.capabilityIndex > 2 ? imgStarFull : imgStarEmpty} />
                <Image src={book.capabilityIndex > 3 ? imgStarFull : imgStarEmpty} />
                <Image src={book.capabilityIndex > 4 ? imgStarFull : imgStarEmpty} />
              </InfoContent>
            </InfoProperty>
            <InfoProperty>
              <InfoTitle>解锁好友数：</InfoTitle>
              <InfoContent>
                需要{book.targetFriendCount}位好友
              </InfoContent>
            </InfoProperty>
            <InfoProperty>
              <InfoTitle>邀请进度条：</InfoTitle>
              <InfoContent>
                <ProcessBar>
                  <span style={{ width: `${(book.participators.length / book.targetFriendCount) * 100}%` }}>&nbsp;</span>
                </ProcessBar>
              </InfoContent>
            </InfoProperty>
            <InfoProperty>
              <InfoTitle style={{ top: book.participators.length > 0 ? '0.02rem' : 0 }}>
                已受邀好友：
              </InfoTitle>
              <InfoContent>
                <Avatars>
                  {
                    book.participators.map(participator => (
                      <Image key={participator.id} src={participator.avatar} />
                    ))
                  }
                </Avatars>
                <Process
                  style={{ marginLeft: book.participators.length > 0 ? '0.06rem' : 0 }}
                >
                  {book.participators.length}/{book.targetFriendCount}
                </Process>
              </InfoContent>
            </InfoProperty>
          </Info>
          <Description>
            <span>简介</span>
            {book.description}
          </Description>

          {
            book.status === 'AVAILABLE' ? (
              <Button onClick={() => { hideDetail(); showExchange(book); }}>{buttonText}</Button>
            ) : (
              this.renderShareLink(book, mobileUrl)
            )
          }

          <ModalClose onClick={() => hideDetail()}><Image src={imgClose} /></ModalClose>
        </ModalBox>
      </Container>
    );
  }
}
