import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
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
`;

const ResetPwd = styled.span`
  margin-top: 0.1rem;
  float: right;
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: #4ab3e2;
`;

const SignInView = props => {
  const { handleSubmit, submitting, pristine, signIn } = props;
  return (
    <div>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <Form onSubmit={handleSubmit(submit(signIn))}>
        <FieldContainer>
          <Field
            name="phone"
            validate={[required('请输入手机号'), isPhone('请输入正确的手机号')]}
            label="手机号"
            id="phone"
            inputType="cellphone"
            component={Input}
            placeholder="请输入手机号"
            type="tel"
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
        </FieldContainer>
        <SubmitContainer>
          <Button type="submit" disabled={pristine || submitting}>
            登录
          </Button>
          <ResetPwd
            onClick={() =>
              history.push({
                pathname: '/resetpwd',
                search: history.location.search,
              })}>
            忘记密码?
          </ResetPwd>
        </SubmitContainer>
      </Form>
    </div>
  );
};

SignInView.propTypes = {
  ...propTypes,
  signIn: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'signIn',
  onSubmitFail,
})(SignInView);
