import axios from 'axios';
import { API_SERVER } from '../../config.json';

axios.defaults.baseURL = `${API_SERVER}`;

function checkStatus(response) {
  if (response.status < 400) {
    return response;
  }

  const error = new Error(response.data.message);
  error.response = response;
  throw error;
}

// TODO: 如果json解析出错了怎么办
// 返回{ response, error }
// 非200同一输出failureCause
function callApi(config) {
  return axios(config)
    .then(checkStatus)
    .then(response => ({ response: response.data }))
    .catch(error => ({
      error: error.response
        ? error.response
        : {
            data: {
              message: error.message,
            },
          },
    }));
}

// for GET data is params
function get(url, data) {
  const { token, ...rest } = data;
  const config = {
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    config.params = rest;
  }
  return callApi(config);
}

// for POST data is params
function post(url, data) {
  const { token, ...rest } = data;
  const config = {
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    config.data = rest;
  }
  return callApi(config);
}

// for POST data is params
function put(url, data) {
  const { token, ...rest } = data;
  const config = {
    url,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    config.data = rest;
  }
  return callApi(config);
}

// fro PUT data is params
function del(url, data) {
  const { token, ...rest } = data;
  const config = {
    url,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    config.params = rest;
  }
  return callApi(config);
}

export const signIn = data => post('/users/login', data);
export const signUp = data => post('/users', data);
export const resetPwd = data => post('/users/resetpwd', data);
export const sendPhoneCaptcha = data => post('/users/sendVerifyCode', data);

export const getUserInfo = data => get('/sessions', data);

// 获取支付pkg
export const postNewOrders = data => post('/orders', data);
export const getPaymentPkg = ({ orderId, ...rest }) => get(`/orders/${orderId}/credential`, rest);
export const getOrder = ({ id, ...rest }) => get(`/orders/${id}`, rest);

export const getCities = data => get('/cities', data);
export const getZones = data => get('/zones', data);
export const getCarports = data => get('/carports', data);

export const getCards = data => get('/users/cards', data);
export const addNewCard = data => post('/users/cards', data);
export const removeCard = ({ id, ...rest }) => del(`/users/cards/${id}`, rest);

export const updateProfile = data => put('/users', data);
export const withdraw = data => post('/withdraw', data);

export const getRecords = data => get('/records', data);
export const getOrders = data => get('/orders', data);

export const getDescendants = data => get('/target/descendants', data);

export const getOpenID = data => get('/wechat/code', data);

export const cancelOrder = ({ id, ...rest }) => del(`/orders/${id}`, rest);

export const getDailySummaries = data => get('/daily/summaries', data);

export const getLevelups = data => get('/levelups', data);

export const getGrade = data => get('/users/grade', data);

// ****************************************************************************************8

// weixin related
export const getJSConfigConfig = data => get('/wechat/signature', data);
