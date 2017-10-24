import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const signUp = createAction('SIGN_UP');
export const signIn = createAction('SIGN_IN');
export const resetPwd = createAction('RESET_PWD');

// 登陆成功
export const authSuccess = createAction('AUTH_SUCCESS');
export const signUpSuccess = createAction('SIGN_UP_SUCCESS');
export const resetPwdSuccess = createAction('RESET_PWD_SUCCESS');

export const signOut = createAction('SIGN_OUT');
// 这个action是统领所有获取token的行为
// TODO: 把token的检查行为放在saga里面会不会有性能的问题？
export const checkAuth = createAction('CHECK_AUTH');

// 发送短信验证码
export const sendCaptcha = createAction('SEND_CAPTCHA');
export const sendCaptchaError = createAction('SEND_CAPTCHA_ERROR');

// 获取用户信息
export const getUserInfo = createAction('GET_USER_INFO');
export const userInfo = createFetchActions('USER_INFO');
