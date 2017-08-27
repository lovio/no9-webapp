import React, { Component } from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import styled from 'styled-components';
import { log } from 'helpers/logger';
import { Link } from 'react-router-dom';
import { Image } from 'ui';

import imgStarFull from 'images/book-star-full.png';
import imgStarEmpty from 'images/book-star-empty.png';
import imgExchangeAvailable from 'images/book-exchange-available.png';
import imgExchangeUnavailable from 'images/book-exchange-unavailable.png';
import imgExchangeCompleted from 'images/book-exchange-completed.png';
import { site } from '../../../../config.json';

export const Container = styled.div`
  padding: 0.15rem;
  background-color: #fff;
  border-radius: 0.05rem;
  overflow: hidden;

  a:hover {
    text-decoration: none;
  }
`;

export const Info = styled.div`
  position: relative;
  height: 1.05rem;
  padding-left: 0.9rem;
`;

export const InfoImage = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  img {
    display: block;
    width: 0.8rem;
    height: 1.05rem;
  }
`;

export const Title = styled.div`
  font-size: 0.16rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const InfoProperty = styled.div`
  margin-top: 0.05rem;
  font-size: 0.12rem;

  span {
    display: inline-block;
    color: #909FA6;
  }

  img {
    display: inline-block;
    margin-right: 0.05rem;
    width: 0.14rem;
  }
`;

export const Description = styled.div`
  margin-top: 0.07rem;
  font-style: italic;
  font-size: 0.12rem;

  span {
    margin-left: 0.06rem;
    color: #FF663C;
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
  display: flex;
  position: relative;
  margin-top: 0.14rem;
  font-size: 0.12rem;
  padding-right: 0.68rem;
`;

export const PropertyTitle = styled.div`
`;

export const PropertyContent = styled.div`
  flex: 1;
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
  position: absolute;
  top: -0.03rem;
  right: 0;

  img {
    width: 0.58rem;
  }
`;

export const Avatars = styled.div`
  display: inline-block;

  img {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: -0.05rem;
    margin-right: 0.05rem;
    border-radius: 0.2rem;
  }
`;

export const Process = styled.div`
  display: inline-block;
  margin-left: 0.06rem;
`;

export default class Card extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    showDetail: PropTypes.func.isRequired,
    showExchange: PropTypes.func.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const book = this.props.book;
    const showDetail = this.props.showDetail;
    const showExchange = this.props.showExchange;

    // 移动分享
    const mobileParams = {
      title: '我在参加智课斩托福送书活动，名额有限，邀你一起来领！送TPO49-53~',
      desc: '智课斩托福送书啦～3本好书，限量免费，速领！',
      link: `${site.zhanToefl}/#/book/share/${book.id}/${book.userId}?isApp=1`,
      imgUrl: book.image,
    };
    const mobileUrl = `mobile://share?${querystring.stringify(mobileParams)}`;

    // 徽章的状态区分
    let bookStatusImage;
    let bookStatusFunc;
    switch (book.status) {
      case 'AVAILABLE':
        bookStatusImage = imgExchangeAvailable;
        bookStatusFunc = () => showExchange();
        break;
      case 'UNAVAILABLE':
        bookStatusImage = imgExchangeUnavailable;
        bookStatusFunc = () => {};
        break;
      case 'COMPLETED':
        bookStatusImage = imgExchangeCompleted;
        bookStatusFunc = () => showExchange(true);
        break;
      default:
        break;
    }

    // 按钮状态区分
    let button;

    if (this.props.isApp) {
      button = (
        <a href={mobileUrl}>
          <Button>
            {book.status !== 'COMPLETED' ? '立即邀请' : '分享晒晒我的成就'}
          </Button>
        </a>
      );
    } else {
      button = (
        <Link
          to={`/book/share/image/${book.id}/${book.userId}`}
          onClick={() => log({ eventDetail: 'BOOK_INVITATION' })}
        >
          <Button>
            {book.status !== 'COMPLETED' ? '立即邀请' : '分享晒晒我的成就'}
          </Button>
        </Link>
      );
    }

    return (
      <Container>
        <Info onClick={() => showDetail()}>
          <InfoImage>
            <Image src={book.image} />
          </InfoImage>
          <Title>{book.title}</Title>
          <InfoProperty>
            <span>宝书能力值：</span>
            <Image src={book.capabilityIndex > 0 ? imgStarFull : imgStarEmpty} />
            <Image src={book.capabilityIndex > 1 ? imgStarFull : imgStarEmpty} />
            <Image src={book.capabilityIndex > 2 ? imgStarFull : imgStarEmpty} />
            <Image src={book.capabilityIndex > 3 ? imgStarFull : imgStarEmpty} />
            <Image src={book.capabilityIndex > 4 ? imgStarFull : imgStarEmpty} />
          </InfoProperty>
          <InfoProperty>
            <span>解锁好友数：</span>
            需要{book.targetFriendCount}位好友
          </InfoProperty>
          <Description>
            {book.description.substring(0, 21)}......
            <span>了解详情</span>
          </Description>
        </Info>

        {button}

        <Property>
          <PropertyTitle>邀请进度条：</PropertyTitle>
          <PropertyContent>
            <ProcessBar>
              <span style={{ width: `${(book.participators.length / book.targetFriendCount) * 100}%` }}>&nbsp;</span>
            </ProcessBar>
            <Exchange onClick={bookStatusFunc}>
              <Image src={bookStatusImage} />
            </Exchange>
          </PropertyContent>
        </Property>

        <Property>
          <PropertyTitle>
            <span style={{ top: book.participators.length > 0 ? '0.02rem' : 0 }}>已受邀好友：</span>
          </PropertyTitle>
          <PropertyContent>
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
          </PropertyContent>
        </Property>
      </Container>
    );
  }
}
