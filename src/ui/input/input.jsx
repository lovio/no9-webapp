import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import noop from 'lodash-es/noop';

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #EEEEEE;
  background-color: #FFF;
  padding: 0 0.15rem;
  align-items: center;

  label {
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: #2E3236;
    margin-right: 0.2rem;
  }
`;

const StyledInput = styled.input`
  display: inline-block;
  padding: 0.17rem 0;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #8F9DA5;
  text-align: right;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin: 0.08rem 0 0.08rem 0.08rem;
  box-sizing: content-box;
  outline: none;
  border: none;
  padding: 0 0.1rem;
  /* Rectangle: */
  background-color: #FFFFFF;
  border: 1px solid #FE663B;
  color: #FE663B;
  border-radius: 0.03rem;
  font-size: 0.12rem;
  line-height: 0.28rem;
  height: 0.28rem;
  white-space: nowrap;

  &:disabled {
    ${''/* border: 0.01rem solid #FE663B;
    color: #FE663B; */}
    opacity: 0.4;
  }
`;

const COUNTER = 60;
let intervalId = '';
const clearInterval = window.clearInterval;

export default class Input extends Component {
  static defaultProps = {
    sendCaptcha: noop,
    captchaType: '',
    inputType: '',
  }

  static propTypes = {
    input: PropTypes.object.isRequired,
    inputType: PropTypes.string,
    label: PropTypes.string.isRequired,
    sendCaptcha: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = props.inputType === 'captcha' ? {
      counter: 0,
      isLoading: false,
      isSent: false,
    } : {};
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  timer = () => new Promise((resolve, reject) => this.setState({ isLoading: true },
      () => this.props.sendCaptcha({ resolve, reject }),
    ),
  ).then(() => {
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
  }).catch(() => this.setState({ isLoading: false }))

  render() {
    const { inputType, label, input, ...rest } = this.props;
    const { counter, isSent, isLoading } = this.state;
    return (
      <Container>
        <label htmlFor={input.name}>{label}</label>
        <StyledInput id={input.name} {...input} {...rest} />
        { inputType === 'captcha' && (
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => {
              if (!isLoading) {
                this.timer();
              }
            }}
          >
            {
              counter <= 0 && (isSent ?
                '重新获取' : '获取验证码')
            }
            {
              counter > 0 && `${counter}秒后可重新获取`
            }
          </Button>
        )}
      </Container>
    );
  }
}
