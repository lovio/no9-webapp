import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import { reduxForm, propTypes, Form, Field } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { onSubmitFail, submit } from 'helpers/form';
import Input from 'ui/input/input';
import Button from 'ui/button';
import { required, isIDCard } from 'helpers/validators';

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
  const { handleSubmit, submitting, pristine, loadGrade } = props;
  return (
    <div>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <Form onSubmit={handleSubmit(submit(loadGrade))}>
        <FieldContainer>
          <Field
            name="IDCardNo"
            validate={[required('请输入身份证号')]}
            label="身份证号"
            id="password"
            inputType="text"
            component={Input}
            placeholder="请输入身份证号"
            type="text"
          />
        </FieldContainer>
        <SubmitContainer>
          <Button type="submit" disabled={pristine || submitting}>
            验证
          </Button>
        </SubmitContainer>
      </Form>
    </div>
  );
};

SignInView.propTypes = {
  ...propTypes,
  loadGrade: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'grade',
  onSubmitFail,
})(SignInView);
