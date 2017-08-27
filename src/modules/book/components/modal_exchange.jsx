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

export const Item = styled.div`
  position: relative;
  margin-top: 0.15rem;
  padding-left: 0.44rem;
  font-size: 0.14rem;

  span {
    position: absolute;
    left: 0;
    top: 0.05rem;
    width: 0.44rem;
  }

  input {
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    outline: none;
    font-size: 0.14rem;
    vertical-align: -0.04rem;
    color: #666;
    padding-bottom: 0.02rem;
  }
`;

export const Button = styled.div`
  height: 0.46rem;
  margin-top: 0.25rem;
  background-color: #FD6838;
  background: linear-gradient(to right, #FF663C 0%, #FF8901 100%);
  border-radius: 0.03rem;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.16rem;
  color: #fff;
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
    book: PropTypes.object.isRequired,
    hideExchange: PropTypes.func.isRequired,
    postExchange: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    isShowExchangeSuccess: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      isButtonAvailable: false,
    };
  }

  postExchange() {
    this.setState({
      status: 'LOADING',
    });

    this.props.postExchange({
      bookId: this.props.book.id,
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
      callback: (err) => {
        this.setState({
          status: err ? 'FAILURE' : 'SUCCESS',
        });

        if (!err) {
          this.props.getBooks();
          setTimeout(() => {
            this.props.hideExchange();
          }, 2000);
        }
      },
    });
  }

  handleInput() {
    return () => {
      if (this.name.value && this.phone.value && this.address.value) {
        this.setState({
          isButtonAvailable: true,
        });
      } else {
        this.setState({
          isButtonAvailable: false,
        });
      }
    };
  }

  render() {
    return (
      <Container>
        {
          this.state.status !== 'SUCCESS' && !this.props.isShowExchangeSuccess ? (
            <ModalBox>
              <Title>请填写以下信息兑换宝书《{this.props.book.title}》，宝书将在五个工作日内发出，请注意查收。</Title>
              <Item>
                <span>姓名：</span>
                <input
                  ref={(name) => { this.name = name; }}
                  onBlur={this.handleInput()}
                  onKeyUp={this.handleInput()}
                />
              </Item>
              <Item>
                <span>手机：</span>
                <input
                  ref={(phone) => { this.phone = phone; }}
                  onBlur={this.handleInput()}
                  onKeyUp={this.handleInput()}
                />
              </Item>
              <Item>
                <span>地址：</span>
                <input
                  ref={(address) => { this.address = address; }}
                  onBlur={this.handleInput()}
                  onKeyUp={this.handleInput()}
                />
              </Item>
              <Button
                style={this.state.isButtonAvailable && this.state.status !== 'LOADING' ? {} : { opacity: '0.5' }}
                onClick={this.state.isButtonAvailable && this.state.status !== 'LOADING' ? () => this.postExchange() : () => {}}
              >
                {this.state.status === 'LOADING' ? '正在处理...' : '立即兑换'}
              </Button>

              <ModalClose onClick={() => this.props.hideExchange()}>
                <Image src={imgClose} />
              </ModalClose>
            </ModalBox>
          ) : (
            <ModalBox>
              <SuccessImage>
                <Image src={imageSuccess} />
                <span>亲，您已兑换成功！</span>
              </SuccessImage>
              <SuccessText>
                我们的工作人员会将您的书在5个工作日内发出，如有任何问题，请直接在公众号内回复进行咨询。
              </SuccessText>

              <ModalClose onClick={() => this.props.hideExchange()}>
                <Image src={imgClose} />
              </ModalClose>
            </ModalBox>
          )
        }
      </Container>
    );
  }
}
