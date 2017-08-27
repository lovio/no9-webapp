登录
===

对于微信，我们使用`code`来登录

### 流程

1. 用户访问链接。程序解析url，看是否有code参数。（同时要解决code出现数组的情况）
2. 如果有code，调用接口获取用户信息。以及token。
3. 如果没有code，判断是不是在weixin中，触发获取openid的操作（拼装code链接，然后跳转）

#### 绑定

1. 跳转到统一的登录页面。

### 需要解决注册的问题

从微信登录还需要注册吗？


FAQ

1. token放在什么地方呢？放在redux里肯定不安全。放在cookie里？还是localstorage里。
2. 或许cookie是更好的方式？不然每次跳转过来


更好的流程
1. 在index的时候检查cookie或者localStorage，有没有信息。如果没有，则跳转微信oauth认证
2. 如果有token信息，可以直接拿来用。当用户访问出现token失效的时候再让用户登录。
