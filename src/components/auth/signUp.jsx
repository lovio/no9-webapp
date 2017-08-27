import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, propTypes, Form, Field, SubmissionError } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { onSubmitFail } from 'helpers/form';
import noop from 'lodash-es/noop';
import Input from 'ui/input/input';
import { Button } from 'ui/button';
import { required, isPhone, checkPasswordLength } from 'helpers/validators';
import { SignUpContainer, SignUpBtnContainer, Contact } from './components';

const titleMappings = {
  // signUp: '注册',
  // forgetPwd: '忘记密码',
  changePhone: '更换手机号',
};

const captchaFieldNameMappings = {
  // signUp: 'captchaPhone',
  // forgetPwd: 'captcha',
  changePhone: 'captcha',
};

const pwdLabelMappings = {
  // signUp: '密码',
  // forgetPwd: '新密码',
  changePhone: '密码',
};

const funcMappings = {
  // signUp: 'signUp',
  // forgetPwd: 'resetPassword',
  changePhone: 'changePhone',
};

class SignUpView extends React.Component {
  static defaultProps = {
    signUp: noop,
    resetPassword: noop,
    changePassword: noop,
    isForgetPwd: false,
  }

  static propTypes = {
    ...propTypes,
    signUp: PropTypes.func,
    resetPassword: PropTypes.func,
    changePassword: PropTypes.func,
    isForgetPwd: PropTypes.bool,
    sendCaptcha: PropTypes.func.isRequired,
  }

  submit = values => new Promise((resolve, reject) => {
    const funcName = funcMappings[this.props.type];
    const func = this.props[funcName];
    func({ values: values.toJS(), resolve, reject });
  }).then(noop).catch((error) => {
    throw new SubmissionError(error);
  });

  // 需要添加错误展示和获取验证码的条件
  render() {
    const { handleSubmit, submitting, pristine, type } = this.props;
    const pwdLabel = pwdLabelMappings[type];
    return (
      <SignUpContainer>
        <Helmet>
          <title>{titleMappings[type]}</title>
        </Helmet>
        <Form onSubmit={handleSubmit(this.submit)}>
          <Field
            name="phone"
            validate={[required('请输入手机号'), isPhone('请输入正确的手机号')]}
            label="手机号"
            id="phone"
            inputType="cellphone"
            component={Input}
            placeholder="请输入手机号"
            type="number"
          />
          <Field
            name={captchaFieldNameMappings[type]}
            validate={[required('请输入验证码')]}
            label="验证码"
            id="captchaPhone"
            inputType="captcha"
            component={Input}
            placeholder="请输入验证码"
            type="number"
            sendCaptcha={this.props.sendCaptcha}
          />
          <Field
            name="password"
            validate={[required(`请输入${pwdLabel}`), checkPasswordLength()]}
            label={pwdLabel}
            id="password"
            inputType="password"
            component={Input}
            placeholder={`请输入${pwdLabel}`}
            type="password"
          />
          <SignUpBtnContainer>
            <Button
              type="submit"
              disabled={pristine || submitting}
            >完成</Button>
          </SignUpBtnContainer>
        </Form>
        {
          type === 'signUp' && (
            <Contact>
              本人已阅读并同意<Link to="/agreement">注册协议</Link>
            </Contact>
          )
        }
        {
          type === 'forgetPwd' && (
            <Contact>
              如果您未收到验证码
              <br />
              请咨询智课斩托福客服电话<a href="tel:400-011-9191">400-011-9191</a>
            </Contact>
          )
        }
      </SignUpContainer>
    );
  }
}

export default reduxForm({ form: 'signUp',
  initialValues: {
    group: 'C',
    from: 'wechat-toefl',
    source: 'wechat-toefl',
  },
  onSubmitFail,
})(SignUpView);
