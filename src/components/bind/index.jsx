import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import Helmet from 'react-helmet';

import { reduxForm, propTypes, Form, Field } from 'redux-form/immutable';

import { required, isEmail, isPhone } from 'helpers/validators';
import { submit, onSubmitFail } from 'helpers/form';
import Input from 'ui/input/input';
import { Button } from 'ui/button';
import { Container, Desc, BtnContainer, Ways, WaysTitle, BindAccount } from './components';

function BindView(props) {
  const { handleSubmit, submitting, pristine, isEMail, checkAccount } = props;
  const desc = isEMail ? '亲，亲输入您要绑定的邮箱地址' : '亲，绑定手机后，您将享受更多优质的服务';
  return (
    <Container>
      <Helmet>
        <title>智课斩托福</title>
      </Helmet>
      <Desc>{desc}</Desc>
      <Form onSubmit={handleSubmit(submit(checkAccount))}>
        {
          isEMail ? (
            <Field
              name="email"
              label="邮箱"
              validate={[required('请输入邮箱地址'), isEmail('请输入正确的邮箱地址')]}
              component={Input}
              type="text"
              placeholder="请输入您的邮箱"
            />
          ) : (
            <Field
              name="phone"
              label="手机号"
              validate={[required('请输入手机号'), isPhone('请输入正确的手机号码')]}
              component={Input}
              type="number"
              placeholder="请输入手机号码"
            />
          )
        }
        <BtnContainer>
          <Button
            type="submit"
            disabled={pristine || submitting}
          >提交</Button>
        </BtnContainer>
      </Form>
      {
        !isEMail && (
          <Ways>
            <WaysTitle>
              <span />
              <p>其他方式绑定</p>
              <span />
            </WaysTitle>
            <div>
              <BindAccount
                onClick={() => {
                  history.push({
                    pathname: '/bind/account',
                    search: history.location.search,
                  });
                }}
              >已有账号绑定</BindAccount>
            </div>
          </Ways>
        )
      }
    </Container>
  );
}

BindView.propTypes = {
  ...propTypes,
  checkAccount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'bind',
  onSubmitFail,
})(BindView);

// {/* <BindEmail
//   onClick={() => {
//     history.push({
//       pathname: '/bind/email',
//       search: history.location.search,
//     });
//   }}
// >邮箱账号绑定</BindEmail> */}
