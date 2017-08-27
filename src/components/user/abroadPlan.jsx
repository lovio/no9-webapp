import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, propTypes, Form, Field, SubmissionError } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { showToastItem } from 'actions/common';
import _values from 'lodash-es/values';
import range from 'lodash-es/range';
import head from 'lodash-es/head';
import Input from 'ui/input/input';
import { Button } from 'ui/button';
import { required, isPhone } from 'helpers/validators';
import { Container, BtnContainer, FieldContainer } from './components';

class AbroadPlanView extends React.Component {
  static propTypes = {
    ...propTypes,
    uploadAbroadPlan: PropTypes.func.isRequired,
  }

  submit = values => new Promise((resolve, reject) => {
    this.props.uploadAbroadPlan({ values: values.toJS(), resolve, reject });
  }).then(() => {}).catch((error) => {
    throw new SubmissionError(error);
  });

  // 需要添加错误展示和获取验证码的条件
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Container>
        <Helmet>
          <title>留学规划</title>
        </Helmet>
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldContainer>
            <label htmlFor="country">意向国家</label>
            <Field
              name="country"
              validate={[required('请选择意向国家')]}
              id="country"
              component="select"
              dir="rtl"
            >
              <option value="">请选择意向国家</option>
              <option value="美国">美国</option>
              <option value="英国">英国</option>
              <option value="加拿大">加拿大</option>
              <option value="澳洲">澳洲</option>
              <option value="欧洲">欧洲</option>
              <option value="亚洲">亚洲</option>
              <option value="其他">其他</option>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="grade">目前就读年级</label>
            <Field
              name="grade"
              validate={[required('请选择目前就读年级')]}
              id="grade"
              component="select"
              dir="rtl"
            >
              <option value="">请选择目前就读年级</option>
              <option value="小学">小学</option>
              <option value="初中">初中</option>
              <option value="高中">高中</option>
              <option value="本科">本科</option>
              <option value="研究生">研究生</option>
              <option value="其他">其他</option>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="date">计划出国时间</label>
            <Field
              name="date"
              id="date"
              component="select"
              dir="rtl"
            >
              <option value="">待定</option>
              {
                range(2017, 2022).map(year => (
                  <option key={year} value={+new Date(String(year))}>
                    {year}
                  </option>
                ))
              }
            </Field>
          </FieldContainer>
          <Field
            name="phone"
            validate={[required('请输入手机号'), isPhone('请输入正确的手机号')]}
            label="手机号"
            id="phone"
            type="number"
            component={Input}
            placeholder="请输入手机号"
          />
          <BtnContainer>
            <Button
              type="submit"
              disabled={pristine || submitting}
            >完成</Button>
          </BtnContainer>
        </Form>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'abroadPlan',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => {
    const errorMsgs = _values(errors);
    // 只展示第一个错误
    dispatch(showToastItem(head(errorMsgs)));
  },
})(AbroadPlanView);
