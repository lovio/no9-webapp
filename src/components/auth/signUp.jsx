import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { reduxForm, propTypes, Form, Field } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { onSubmitFail, submit } from 'helpers/form';
import Input from 'ui/input/input';
import Button from 'ui/button';
import { required, isPhone } from 'helpers/validators';

const FieldContainer = styled.div`
  background-color: white;
  padding-left: 0.2rem;
`;

const SubmitContainer = styled.div`
  padding: 0.12rem 0.2rem;
  text-align: center;
  p {
    /* 未注册的手机号码将自动创建账户: */
    font-size: 0.12rem;
    color: #9b9b9b;
    line-height: 0.18rem;
    margin-bottom: 0.1rem;
  }

  p:last-of-type {
    margin-top: 0.3rem;
    a {
      color: #0889ff;
    }
  }
`;

const SignInView = props => {
  const { handleSubmit, submitting, pristine, signUp, sendCaptcha, initialValues } = props;
  return (
    <div>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <Form onSubmit={handleSubmit(submit(signUp))}>
        <FieldContainer>
          <Field
            name="phone"
            validate={[required('请输入手机号'), isPhone('请输入正确的手机号')]}
            label="+86"
            id="phone"
            inputType="cellphone"
            component={Input}
            placeholder="请输入手机号"
            type="number"
          />
          <Field
            name="verifyCode"
            validate={[required('请输入短信验证码')]}
            label="验证码"
            id="captchaPhone"
            inputType="captcha"
            component={Input}
            placeholder="请输入短信验证码"
            type="number"
            sendCaptcha={sendCaptcha}
          />
          <Field
            name="password"
            validate={[required('请输入登录密码')]}
            label="登录密码"
            id="password"
            inputType="password"
            component={Input}
            placeholder="请输入登录密码"
            type="password"
          />
          <Field
            name="referrerCode"
            validate={[required('请输入邀请码')]}
            label="邀请码"
            id="captchaPhone"
            inputType="referrerCode"
            component={Input}
            placeholder="请输入邀请码"
            disabled={!!initialValues.get('referrerCode')}
          />
        </FieldContainer>
        <SubmitContainer>
          <Button type="submit" disabled={pristine || submitting}>
            注册
          </Button>
          <p>
            注册即表示同意九路泊车<Link to="/agreement">《用户使用协议》</Link>
          </p>
        </SubmitContainer>
      </Form>
    </div>
  );
};

SignInView.propTypes = {
  ...propTypes,
  signUp: PropTypes.func.isRequired,
  sendCaptcha: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'signUp',
  onSubmitFail,
})(SignInView);
