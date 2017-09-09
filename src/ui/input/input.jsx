import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import noop from 'lodash-es/noop';

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #eaeaea;
  padding: 0.15rem 0.2rem 0.15rem 0;
  align-items: center;

  label {
    text-align: center;
    width: 0.8rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #2e3236;
    border-right: 1px solid #eaeaea;
    margin-right: 0.1rem;
  }

  &:last-of-type {
    border: none;
  }
`;

const StyledInput = styled.input`
  display: inline-block;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #8f9da5;
  text-align: right;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: 0.1rem;
  box-sizing: content-box;
  outline: none;
  border: none;
  padding: 0 0.1rem;
  /* Rectangle: */
  background-color: #ffffff;
  border: 1px solid #57d3f2;
  color: #57d3f2;
  border-radius: 0.03rem;
  font-size: 0.12rem;
  line-height: 0.2rem;
  height: 0.28rem;
  white-space: nowrap;

  &:disabled {
    opacity: 0.4;
  }
`;

const Tip = styled.span`
  margin-left: 0.1rem;
  line-height: 0.2rem;
  font-size: 0.12rem;
  color: #9b9b9b;
`;

const COUNTER = 60;
let intervalId = '';
const clearInterval = window.clearInterval;

export default class Input extends Component {
  static defaultProps = {
    sendCaptcha: noop,
    captchaType: '',
    inputType: '',
  };

  static propTypes = {
    input: PropTypes.object.isRequired,
    inputType: PropTypes.string,
    label: PropTypes.string.isRequired,
    sendCaptcha: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state =
      props.inputType === 'captcha'
        ? {
          counter: 0,
          isLoading: false,
          isSent: false,
        }
        : {};
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  timer = () =>
    new Promise((resolve, reject) =>
      this.setState({ isLoading: true }, () => this.props.sendCaptcha({ resolve, reject })),
    )
      .then(() => {
        clearInterval(intervalId);
        this.setState({ counter: COUNTER }, () => {
          intervalId = setInterval(() => {
            if (this.state.counter <= 1) {
              clearInterval(intervalId);
              intervalId = '';
              this.setState({ isLoading: false, isSent: true });
            }
            this.setState(prevState => ({
              counter: prevState.counter - 1,
            }));
          }, 1000);
        });
      })
      .catch(() => this.setState({ isLoading: false }));

  render() {
    const { inputType, label, input, ...rest } = this.props;
    const { counter, isSent, isLoading } = this.state;
    return (
      <Container>
        <label htmlFor={input.name}>{label}</label>
        <StyledInput id={input.name} {...input} {...rest} />
        {inputType === 'captcha' && (
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => {
              if (!isLoading) {
                this.timer();
              }
            }}
          >
            {counter <= 0 && (isSent ? '重新获取' : '获取验证码')}
            {counter > 0 && `${counter}秒后可重新获取`}
          </Button>
        )}
        {inputType === 'referrerCode' && <Tip>邀请码不可修改</Tip>}
      </Container>
    );
  }
}
