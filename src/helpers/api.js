import axios from 'axios';
import assign from 'lodash-es/assign';
import { api } from '../../config.json';

axios.defaults.baseURL = `${api.zhanToefl}/mobile`;

function checkStatus(response) {
  let errMsg;
  if (response.status >= 200 && response.status < 300) {
    if (response.data.code === 0) {
      return response.data;
    }
    errMsg = response.data.msg;
  } else {
    errMsg = response.statusText;
  }

  const error = new Error(errMsg);
  error.response = response;
  throw error;
}

// TODO: 如果json解析出错了怎么办
// 返回{ response, error }
// 非200同一输出failureCause
function callApi(config) {
  return axios(config).then(checkStatus).then(response => ({ response: response.data }))
    .catch(error => ({
      error: error.response,
    }));
}

// for GET data is params
function get(url, data) {
  let config = assign({
    url,
    method: 'GET',
    // headers: {
    //   Authorization: 'Bearer ${window.token}',
    // },
  });
  if (data) {
    config = assign(config, { params: data });
  }
  return callApi(config);
}

// for POST data is params
function post(url, data) {
  let config = assign({
    url,
    method: 'POST',
  });
  if (data) {
    config = assign(config, { data });
  }
  return callApi(config);
}

// fro PUT data is params
// function put(url, data) {
//   let config = assign({
//     url,
//     method: 'PUT',
//   });
//   if (data) {
//     config = assign(config, { data });
//   }
//   return callApi(config);
// }

// auth
export const checkAccount = data => post('/common/user/signup/check', data);
export const changePhone = data => post('/wechat/phone', data);

// 获取短信验证码
export const sendPhoneCaptcha = data => post('/common/user/mobile/captchaPhone', data);
export const sendEmailCaptcha = data => post('/common/user/captcha/email', data);

export const bindAccount = data => post('/wechat/user-info', data);
export const unbindAccount = data => post('/wechat/user/unbind', data);

export const postChangeName = data => post('/wechat/nickname', data);

// weixin related
export const getJSConfigConfig = data => get('/wechat/signature', data);

export const checkWechatBindStatus = data => get('/wechat/bind', data);

// deprecated
// export const bindWechat = data => post('/wechat/user-info', data);

// 积分
export const getCredits = data => get('/common/bonus-point', data);
// 考试倒计时
export const getIntention = data => get('/common/countdown', data);
export const getCheckin = data => get('/common/sign-in', data);
export const getAnswerCount = data => get('/exercise/answer/count', data);
export const postCheckin = data => post('/common/sign-in', data);

export const getExerciseLately = data => get('/exercise/lately', data);

// ti
// ================================
// 根据教材以及科目获取列表信息的接口
// api/textbook/question-packages?subjectId=3&textbookId=1
export const getExerciseQuestionPackage = data => get('/exercise/question-packages', data);
export const getExerciseCounts = ({ subjectId }) => get(`/exercise/count/${subjectId}`);
// 根据科目获取题型标签列表
// 题库话题列表
export const getTiTopics = data => get('/exercise/type', data);
// 根据标签获取练习状态
export const getTiTopic = data => get('/exercise/questions', data);
// 获取subject-menu
export const getExerciseMenu = data => get('/wechat/subject-menu', data);

export const getStudyRecords = data => get('/exercise/records/day', data);

// data
export const uploadAbroadPlan = data => post('/wechat/abroad-plan', data);
export const getAbroadPlan = data => get('/wechat/abroad-plan', data);

// examTime
export const postExamTime = data => post('/common/intention', data);

// share info
export const getShareInfo = data => get('/common/share/user', data);
export const uploadHeadImage = data => post('/wechat/head-img', data);

export const getCapabilityTest = data => get('/common/test', data);

// 积分
export const getCreditRecords = data => get('/common/point/record', data);

// 勋章
export const getMedals = data => get('/common/medal', data);

// 配置
export const getConfig = data => get('/common/config', data);

// 图书
export const getBook = data => get('/common/book', data);
export const getBooks = data => get('/common/books', data);
export const postExchange = data => post('/common/book/exchange', data);
export const postInvitation = data => post('/common/book/invitation', data);

// 用户
export const getUser = data => get('/common/user', data);

// 分享图片
export const getShareImage = data => get('/common/book/share/image', data);

export const uploadShareStats = data => post('/common/share', data);
export const uploadMeiqiaStats = data => post('/wechat/ask-teacher', data);
