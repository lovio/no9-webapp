import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, propTypes, Form, Field } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { onSubmitFail, submit } from 'helpers/form';
import Input from 'ui/input/input';
import Button from 'ui/button';
import { required } from 'helpers/validators';

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

const AddNewCardView = (props) => {
  const { handleSubmit, submitting, pristine, addNewCard } = props;
  return (
    <div>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <Form onSubmit={handleSubmit(submit(addNewCard))}>
        <FieldContainer>
          <Field
            name="name"
            validate={[required('请输入真实姓名')]}
            label="姓名"
            id="name"
            component={Input}
            placeholder="收款人姓名，必须是会员本人"
            type="text"
          />
          <Field
            name="cardNo"
            validate={[required('请输入收款人银行卡号')]}
            label="卡号"
            id="cardNo"
            component={Input}
            placeholder="收款人银行卡号"
            type="number"
          />
          <Field
            name="openingBank"
            validate={[required('请输入开户行')]}
            label="开户行"
            id="openingBank"
            component={Input}
            placeholder="收款人开户行"
            type="text"
          />
        </FieldContainer>
        <SubmitContainer>
          <Button type="submit" disabled={pristine || submitting}>
            确认绑卡
          </Button>
        </SubmitContainer>
      </Form>
    </div>
  );
};

AddNewCardView.propTypes = {
  ...propTypes,
  addNewCard: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'resetPwd',
  onSubmitFail,
})(AddNewCardView);
