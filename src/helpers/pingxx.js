import pingpp from 'pingpp-js';

export function createPayment(charge) {
  return new Promise(resolve =>
    pingpp.createPayment(charge, function(result, err) {
      resolve({ result, err });
      if (result == 'success') {
        // 只有微信公众账号 (wx_pub)、QQ 公众号 (qpay_pub)、支付宝口碑 (alipay_qr)
        // 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
      } else if (result == 'fail') {
        // charge 不正确或者微信公众账号/QQ 公众号/支付宝口碑支付失败时会在此处返回
      } else if (result == 'cancel') {
        // 微信公众账号、QQ 公众号、支付宝口碑支付取消支付
      }
    })
  );
}
