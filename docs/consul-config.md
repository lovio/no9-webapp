Consul配置说明
============

测试环境consul配置服务的地址 `http://config.dev.smartstudy.com/admin`

需要在Consul中创建一个`zhanToeflFrontendPrivate`的私有配置。

  cp consul.config.json.example consul.config.json

需要的配置项：

#### zhanToeflFrontendPrivate

1. disableSSR: false  *是否启用服务端渲染*
3. uploadDir: /zhan-toefl-fe  *静态资源上传目录*
4. port: 20000 *端口号*
5. WX_APPID: xxxxxx *微信公众号APPID*
6. WX_VERIFY_ID： xxxxx *用于微信验证我们的域名和服务器*
7. sentry *bug追踪服务*
8. universalLink: 对应app的universalLink


需要在site中添加：
#### site

1. zhanToefl: "//zhan-toefl.hq.smartstudy.com"
2. wapTi: "//wapti.hq.smartstudy.com"   依赖项


示例

zhanToeflFrontendPrivate

```json
{
    "disableSSR": true,
    "uploadDir": "/zhan-toefl-fe",
    "port": 20000,
    "WX_APPID": "wxd83da80086a8158b",
    "WX_VERIFY_ID": "7NOKMpK6HkRvMcSI",
    "sentry": "https://064278f7f30946c0a77aab7013358a98@sentry.io/145981",
    "universalLink": "http://universal-link.hq.smartstudy.com/api/mobile/common/universal-link/zhan-toefl/navigation/ability-test"
}
```
