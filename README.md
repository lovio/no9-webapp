# no9-webapp

## 起源
该项目的架构基于[react-slingshot](https://github.com/coryhouse/react-slingshot)。
变更了以下内容：

<!-- 1. 使用`postcss`/`precss`代替了`sass`。原因：
  * `node-sass`在墙内安装很容易出现问题。`node-sass`在安装的过程中需要到github下载一个node-gyp包，
  这个下载过程很缓慢，容易断导致安装失败。
  * `postcss`更强大、易用。应该是未来的趋势。尽管`sass`已经足够好。 -->
2. 使用`pug`(就是`jade`)替代ejs做模板。同时将模板直接做server渲染的模板
3. 使用express来提供static服务代替纯前端静态页面。原因
  * 可以根据request更灵活的response，比如`X-Token`的处理。
  * 未来可以扩展至react服务端渲染，减少首屏时间。
  * 等等
4. 使用`airbnb`的javascript规范
5. 使用[redux-saga](https://github.com/yelouafi/redux-saga)来做side effects管理
6. CSS方案使用`styled-components`
7. 服务端渲染暂时不能开启，需要进行升级
8. 使用jest来写测试

## 开始

1. 安装`watchman`：`brew install watchman`(测试用来监听文件)
1. 通过`npm run gen:config`来生成配置文件。
2. `npm start -s`启动程序进行开发
3. 可以使用`browserSync`进行调试

## 部署

1. 配置consul，步骤可以查看[docs/consul-config.md](./docs/consul-config.md)
2. `cp consul.config.json.example consul.config.json`来生成consul配置文件

如果`consul.config.json`中没有oss这一项，执行`yarn run upload:oss`会不上传


docker-compose部署：

3. `cp docker-compose.yml.example docker-compose.yml`。
4. 根据需要修改`docker-compose.yml`中的端口映射。
5. `docker-compose up --build -d`。等待，完成。


如果不使用docker-compose来部署，步骤如下：

3. `npm run build`生成assets
4. 通过`pm2 start server.js`来启动程序，或者使用`node server.js`

## Roadmap

<!-- 1. 使用CSS MODULES重构CSS代码，更好的模块化 -->
2. 使用Relay/GraphQL代替现有接口方式
<!-- 3. 使用React-Native在当前前端的基础上，讲APP相关页面原生化 -->
4. Routes优化，动态加载。
5. 添加服务端渲染

## 关于编辑器

不管使用什么编辑器atom/sublime/vscode或者其他的都是可以安装一些插件的
比如linter-eslint/editorconfig来使用项目下的配置文件
