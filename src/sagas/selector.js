// for redux-saga yield select
import { formValueSelector } from 'redux-form/immutable';

export const getPagination = type => {
  const dataArr = ['pagination', type];
  return state => state.getIn(dataArr);
};

export const getFormValuesByName = (formName, ...keys) => {
  const selector = formValueSelector(formName);
  return state => selector(state, ...keys);
};
