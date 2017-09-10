import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const signIn = createAction('SIGN_IN');
export const signOut = createAction('SIGN_OUT');

// 登陆成功
export const authSuccess = createAction('AUTH_SUCCESS');

// 这个action是统领所有获取token的行为
// TODO: 把token的检查行为放在saga里面会不会有性能的问题？
export const checkAuth = createAction('CHECK_AUTH');

// 发送短信验证码
export const sendCaptcha = createAction('SEND_CAPTCHA');
export const sendCaptchaError = createAction('SEND_CAPTCHA_ERROR');

// 获取用户信息
export const getUserInfo = createAction('GET_USER_INFO');
export const userInfo = createFetchActions('USER_INFO');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const registerToken = createAction('REGISTER_TOKEN');

// 添加一个新的ACTION来统领所有的登录成功操作
// 替代原来的signInSuccess

export const sendPhoneCaptcha = createAction('SEND_PHONE_CAPTCHA');
export const sendPhoneCaptchaError = createAction('SEND_PHONE_CAPTCHA_ERROR');

// 检查手机号或者邮箱是否存在
export const checkAccount = createAction('CHECK_ACCOUNT');
export const checkAccountSuccess = createAction('CHECK_ACCOUNT_SUCCESS');
export const checkAccountFailure = createAction('CHECK_ACCOUNT_FAILURE');

export const bindAccount = createAction('BIND_ACCOUNT');
export const bindAccountSuccess = createAction('BIND_ACCOUNT_SUCCESS');
export const bindAccountConflict = createAction('BIND_ACCOUNT_CONFLICT');
export const setUnbindInfo = createAction('SET_UNBIND_INFO');
export const setBindInfo = createAction('SET_BIND_INFO');

export const unbindAccount = createAction('UNBIND_ACCOUNT');
export const accountUnbind = createFetchActions('ACCOUNT_UNBIND');

// 正式环境是没有的，仅仅测试使用

// 微信检查是否绑定
export const checkWechatBindStatus = createAction('CHEACK_WECHAT_BIND_STATUS');
export const wechatBindStatus = createFetchActions('WECHAT_BIND_STATUS');

export const tokenFailure = createAction('TOKEN_FAILURE');
