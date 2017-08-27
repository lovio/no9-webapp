import size from 'lodash-es/size';
import isEmailValidator from 'validator/lib/isEmail';

export const required = tip => (value) => {
  if (value) {
    return undefined;
  }
  return tip || 'Required';
};

export const isPhone = tip => (value) => {
  if (value) {
    const phone = String(value).replace(/(^\s+)|(\s+$)/g, '');
    if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(phone)) {
      return undefined;
    }
  }
  return tip || '请输入正确的手机号';
};

export const isEmail = tip => (value) => {
  if (isEmailValidator(value)) {
    return undefined;
  }
  return tip || '请输入正确的电子邮箱';
};

export const checkPasswordLength = tip => (value) => {
  const length = size(value);
  if (length >= 6 && length <= 16) {
    return undefined;
  }
  return tip || '密码长度6到16位';
};

// value is always string
export const checkCorrectScore = tip => (value) => {
  if (value >= 0 && value <= 120) {
    return undefined;
  }
  return tip || '请输入填写正确的分数';
};

export const checkPasswordSame = password => (value) => {
  const tip = value !== password ? '两次密码不一致' : undefined;
  return tip;
};
