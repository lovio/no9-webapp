// import { browserHistory } from 'react-router-dom';
import { WX_OAUTH_API } from 'constants/constants.json';
import qs from 'qs';
import { WX_APPID } from '../../config.json';
import Mitt from './mitt';

// redirect to weixin oauth url
// type: base or userinf
export function transferCode({ type, url }) {
  const scopeType = type === 'userinfo' ? 'userinfo' : 'base';
  const search = {
    appid: WX_APPID,
    redirect_uri: url || window.location.href,
    response_type: 'code',
    scope: `snsapi_${scopeType}`,
    state: scopeType,
  };
  const newUrl = `${WX_OAUTH_API}?${qs.stringify(search)}#wechat_redirect`;
  window.location.replace(newUrl);
}

export function initWechatConfig(config) {
  return new Promise((resolve, reject) => {
    window.wx.config(config);
    window.wx.ready(resolve);
    window.wx.error(reject);
  });
}

export function setShare(shareData) {
  const { title, desc } = shareData;
  window.wx.onMenuShareTimeline({
    title: [title, ' - ', desc].join(''), // 分享标题
    link: shareData.link, // 分享链接
    imgUrl: shareData.imgUrl, // 分享图标
    success: () => {
      Mitt.emit('share', {
        type: 'timeline',
        result: 'success',
      });
    },
    cancel: () => {
      Mitt.emit('share', {
        type: 'timeline',
        result: 'cancel',
      });
    },
  });
  window.wx.onMenuShareAppMessage({
    title: shareData.title, // 分享标题
    link: shareData.link, // 分享链接
    imgUrl: shareData.imgUrl, // 分享图标
    desc: shareData.desc, // 分享描述
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: () => {
      Mitt.emit('share', {
        type: 'message',
        result: 'success',
      });
    },
    cancel: () => {
      Mitt.emit('share', {
        type: 'message',
        result: 'cancel',
      });
    },
  });
}

export function chooseImage() {
  return new Promise((resolve, reject) => {
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        return resolve(localIds[0]);
      },
      fail: reject,
      cancel: () => resolve(),
    });
  });
}

export function uploadImage(localId) {
  return new Promise((resolve, reject) => {
    window.wx.uploadImage({
      localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: (res) => {
        const serverId = res.serverId; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        return resolve(serverId);
      },
      fail: reject,
    });
  });
}
