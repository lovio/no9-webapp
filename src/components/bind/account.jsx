import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import get from 'lodash-es/get';

import { reduxForm, propTypes, Form, Field, SubmissionError } from 'redux-form/immutable';

import { required, checkPasswordLength } from 'helpers/validators';
import { submit, onSubmitFail } from 'helpers/form';
import Input from 'ui/input/input';
import { Button } from 'ui/button';
import { Container, BtnContainer } from './components';

function AccountView(props) {
  const {
    handleSubmit,
    submitting,
    pristine,
    bindAccount,
    bindAccountConflict,
  } = props;
  return (
    <Container>
      <Helmet>
        <title>智课斩托福</title>
      </Helmet>
      <Form
        onSubmit={
          handleSubmit(submit(bindAccount, undefined, (errors) => {
            if (get(errors, 'code') === 10301) {
              bindAccountConflict(errors);
            } else {
              throw new SubmissionError(errors);
            }
          }))
        }
      >
        <Field
          name="account"
          label="账号"
          validate={[required('请输入账号')]}
          component={Input}
          type="text"
          placeholder="请输入账号"
        />
        <Field
          name="password"
          label="密码"
          validate={[required('请输入密码'), checkPasswordLength()]}
          component={Input}
          type="password"
          placeholder="请输入密码"
        />
        <BtnContainer>
          <Button
            type="submit"
            disabled={pristine || submitting}
          >立即绑定</Button>
        </BtnContainer>
      </Form>
    </Container>
  );
}

AccountView.propTypes = {
  ...propTypes,
  bindAccount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'bindAccount',
  onSubmitFail,
})(AccountView);
