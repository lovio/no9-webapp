import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { reduxForm, propTypes, Form, Field } from 'redux-form/immutable';

import { required } from 'helpers/validators';
import { submit, onSubmitFail } from 'helpers/form';
import Input from 'ui/input/input';
import { Button } from 'ui/button';
import { Container, Desc, BtnContainer, Contact } from './components';

function CaptchaView(props) {
  const {
    handleSubmit,
    submitting,
    pristine,
    type,
    value,
    sendCaptcha,
    bindAccount,
  } = props;
  return (
    <Container>
      <Helmet>
        <title>智课斩托福</title>
      </Helmet>
      <Desc>亲，请输入{type === 'phone' ? '手机' : '邮箱'}{value}收到的验证码</Desc>
      <Form onSubmit={handleSubmit(submit(bindAccount))}>
        <Field
          name="captcha"
          label="验证码"
          validate={[required('请输入验证码')]}
          component={Input}
          type="number"
          placeholder="请输入验证码"
          inputType="captcha"
          sendCaptcha={sendCaptcha}
        />
        <BtnContainer>
          <Button
            type="submit"
            disabled={pristine || submitting}
          >立即绑定</Button>
        </BtnContainer>
      </Form>
      <Contact>
        如果您未收到验证码
          <br />
        请咨询智课斩托福客服电话<a href="tel:400-011-9191">400-011-9191</a>
      </Contact>
    </Container>
  );
}

CaptchaView.propTypes = {
  ...propTypes,
  sendCaptcha: PropTypes.func.isRequired,
  bindAccount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'bindCaptcha',
  onSubmitFail,
})(CaptchaView);
