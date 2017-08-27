import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Image } from 'ui';

import imgBookHeader from 'images/book-header.png';
import imgDescriptionTitle from 'images/book-description-title.png';

import CardGroupView from './card_group';
import ModalCardView from './modal_card';
import ModalExchangeView from './modal_exchange';
import ModalSuccessView from './modal_success';

export const Header = styled.div`
  height: 2.4rem;
  background-image: url('${imgBookHeader}');
  background-position: center;
  background-size: 3.75rem 2.4rem;
  background-repeat: no-repeat;
`;

export const Description = styled.div`
  margin-top: 0.35rem;

  img {
    display: block;
    height: 0.4rem;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  padding: 0.15rem;
  margin: 0 0.2rem;
  margin-top: 0.15rem;
  margin-bottom: 0.5rem;
  font-size: 0.14rem;
  color: #fff;
  background-color: rgba(0,0,0,0.15);
  border-radius: 0.03rem;
`;

export const Title = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 0.05rem;
  font-weight: bold;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const Text = styled.div`
`;

export default class Book extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    postExchange: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    isApp: PropTypes.string.isRequired,
    invitationBookId: PropTypes.string.isRequired,
    invitationInviterId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      book: undefined,
      isShowDetail: false,
      isShowExchange: false,
      isShowExchangeSuccess: false,
      hasShowSuccess: false,
    };
  }

  showDetail() {
    return (book) => {
      this.setState({
        isShowDetail: true,
        book,
      });
    };
  }

  hideDetail() {
    return () => {
      this.setState({
        isShowDetail: false,
      });
    };
  }

  showExchange() {
    return (book, isShowExchangeSuccess) => {
      this.setState({
        isShowExchange: true,
        isShowExchangeSuccess,
        book,
      });
    };
  }

  hideExchange() {
    return () => {
      this.setState({
        isShowExchange: false,
      });
    };
  }

  hideSuccess() {
    return () => {
      this.setState({
        hasShowSuccess: true,
      });
    };
  }

  render() {
    return (
      <div style={{ minHeight: '100%', backgroundColor: '#0CCD62', paddingBottom: '0.01rem' }}>
        <Helmet>
          <title>开学有礼好书福 - 智课斩托福</title>
        </Helmet>

        <Header />

        <CardGroupView
          books={this.props.books}
          showDetail={this.showDetail()}
          showExchange={this.showExchange()}
          isApp={this.props.isApp}
        />

        <Description>
          <Image src={imgDescriptionTitle} />

          <Content>
            <Title>活动流程</Title>
            <Text>
              1.任一“智课斩托福”用户均可发起“邀好友、得宝书”活动；<br />
              2.根据每本书的能力指数，所需解锁好友人数也有对应变化；<br />
              3.每位被邀请的好友完成注册后即视为成功邀请，达到指定解锁人数后即视为目标书籍解锁成功；<br />
              4.每本书提交收货地址并解锁成功后，5个工作日内会以快递形式寄出；<br />
              5.每一期的书籍数量有限，换完即止。<br />
            </Text>
            <Title>截止日期</Title>
            <Text>
              即日起至<span>2017年6月14日</span>
            </Text>
            <Title>注意事项</Title>
            <Text>
              1.同一用户（同一微信号）只能解锁一本书，不可重复领取，每本书超出领取限额后，书藉下架；<br />
              2.智课员工及其家属不能参与此活动；<br />
              3.如有问题，可咨询微信服务号@智课斩托福；<br />
              4.智课保留对本次活动的最终解释权。<br />
            </Text>
          </Content>
        </Description>

        {
          this.state.isShowDetail ? (
            <ModalCardView
              book={this.state.book}
              hideDetail={this.hideDetail()}
              showExchange={this.showExchange()}
              isApp={this.props.isApp}
            />
          ) : ''
        }

        {
          this.state.isShowExchange ? (
            <ModalExchangeView
              book={this.state.book}
              hideExchange={this.hideExchange()}
              postExchange={this.props.postExchange}
              getBooks={this.props.getBooks}
              isShowExchangeSuccess={this.state.isShowExchangeSuccess}
            />
          ) : ''
        }

        {
          this.props.invitationBookId &&
          this.props.invitationInviterId &&
          !this.state.hasShowSuccess ? (
            <ModalSuccessView hideModal={this.hideSuccess()} />
          ) : ''
        }
      </div>
    );
  }
}
