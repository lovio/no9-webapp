const u = navigator.userAgent;
export const inWechat = new RegExp('MicroMessenger', 'i').test(u);

export const inAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

export const inApp = new RegExp('ZhanToefl', 'i').test(u);

export const inIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
