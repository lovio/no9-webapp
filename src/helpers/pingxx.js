import pingpp from 'pingpp-js';

export function createPayment(charge) {
  return new Promise((resolve) => {
    pingpp.createPayment(charge, (result, err) => {
      if (result === 'success') {
        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
        return resolve({ status: 'success', result });
      } return resolve({ status: 'fail', err });
    });
  });
}
