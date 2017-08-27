import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

// 负责拉取下面的数据1,2,3,4
export const loadUserData = createAction('LOAD_USER_DATA');
// 用户积分 1
export const loadCredits = createAction('LOAD_CREDITS');
export const credits = createFetchActions('CREDITS');
// 考试倒计时 2
export const loadIntention = createAction('LOAD_INTENTION');
export const intention = createFetchActions('INTENTION');
// 签到信息 3
export const loadCheckin = createAction('LOAD_CHECKIN');
export const checkin = createFetchActions('CHECKIN');
// 签到动作
export const doCheckin = createAction('DO_CHECKIN');
export const checkinRequest = createFetchActions('CHECKIN_REQUEST');
// 累计做题数目 4
export const loadAnswerCount = createAction('LOAD_ANSWER_COUNT');
export const answerCount = createFetchActions('ANSWER_COUNT');
// 出国计划
export const loadAbroadPlan = createAction('LOAD_ABROAD_PLAN');
export const abroadPlan = createFetchActions('ABROAD_PLAN');

// 能力测试
export const loadCapabilityTest = createAction('LOAD_CAPABILITY_TEST');
export const capabilityTest = createFetchActions('CAPABILITY_TEST');

// 加载个人信息
export const loadUserInfo = createAction('LOAD_USER_INFO');
export const userInfo = createFetchActions('USER_INFO');
export const userInfoLoaded = createAction('USER_INFO_LOADED');
export const clearUserInfo = createAction('CLEAR_USER_INFO');

// ====================================================================
// 上传头像
export const uploadAvatar = createAction('UPLOAD_AVATAR');
export const avatarUpload = createFetchActions('AVATAR_UPLOAD');

export const uploadAbroadPlan = createAction('UPLOAD_ABROAD_PLAN');
export const uploadAbroadPlanSuccess = createAction('UPLOAD_ABROAD_PLAN_SUCCESS');

export const setExamTime = createAction('SET_EXAM_TIME');
export const setExamTimeSuccess = createAction('SET_EXAM_TIME_SUCCESS');

// 外部分享页信息
export const loadShareInfo = createAction('LOAD_SHARE_INFO');
export const shareInfo = createFetchActions('SHARE_INFO');

export const loadWechatImage = createAction('LOAD_WECHAT_IMAGE');

export const changeName = createAction('CHANGE_NAME');
export const changeNameSuccess = createAction('CHANGE_NAME_SUCCESS');
export const changeNameFailure = createAction('CHANGE_NAME_FAILURE');

export const changePhone = createAction('CHANGE_PHONE');
export const changePhoneSuccess = createAction('CHANGE_PHONE_SUCCESS');

// 提交分享
export const shareStats = createFetchActions('SHARE_STATS');
export const meiqiaStats = createFetchActions('MEIQIA_STATS');
