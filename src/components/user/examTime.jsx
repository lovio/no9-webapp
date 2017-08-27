import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, propTypes, Form, Field, SubmissionError } from 'redux-form/immutable';
import Helmet from 'react-helmet';
import parse from 'date-fns/parse';

import { showToastItem } from 'actions/common';
import _values from 'lodash-es/values';
import head from 'lodash-es/head';
import { Button } from 'ui/button';
import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import { required } from 'helpers/validators';
import { examDateList } from 'constants/toeflExamTimeList.json';
import { Container, BtnContainer, FieldContainer } from './components';

function getUnix(date) {
  return +date / 1000;
}

const now = getUnix(new Date());
const dateList = filter(map(examDateList, date => ({
  date,
  timestamp: getUnix(parse(date)),
})), item => item.timestamp > now);

class AbroadPlanView extends React.Component {
  static propTypes = {
    ...propTypes,
    setExamTime: PropTypes.func.isRequired,
  }

  submit = values => new Promise((resolve, reject) => {
    this.props.setExamTime({ values: values.toJS(), resolve, reject });
  }).then(() => {}).catch((error) => {
    throw new SubmissionError(error);
  });

  // 需要添加错误展示和获取验证码的条件
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Container>
        <Helmet>
          <title>考试时间设置</title>
        </Helmet>
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldContainer>
            <label htmlFor="examTime">考试时间选择</label>
            <Field
              name="examTime"
              validate={[required('请选择考试时间')]}
              id="examTime"
              component="select"
              dir="rtl"
            >
              <option value="">请选择考试时间</option>
              {
                dateList.map(date => (
                  <option key={date.timestamp} value={date.timestamp}>{date.date}</option>
                ))
              }
            </Field>
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="targetScore">目标分数</label>
            <Field
              name="targetScore"
              validate={[required('请选择目标分数')]}
              id="targetScore"
              component="select"
              dir="rtl"
            >
              <option value="">请选择目标分数</option>
              <option value={1}>100分以上</option>
              <option value={2}>90-99分</option>
              <option value={3}>80-89分</option>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="isExamined">是否考过托福</label>
            <Field
              name="isExamined"
              validate={[required('请选择是否考过托福')]}
              id="isExamined"
              component="select"
              dir="rtl"
            >
              <option value="">请选择</option>
              <option value={1}>考过</option>
              <option value={2}>未考过</option>
            </Field>
          </FieldContainer>
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
  form: 'examTime',
  onSubmitFail: (errors, dispatch) => {
    const errorMsgs = _values(errors);
    // 只展示第一个错误
    dispatch(showToastItem(head(errorMsgs)));
  },
})(AbroadPlanView);
