如何处理样式
==========

我们这个项目的样式是做的非常革命的。

参照`mobile.twitter.com`，把所有的css去掉。全部使用`css in js`。

有些没有办法的CSS目前先暂时内联到pug里，比如html

该项目采用的css架构是`styled-components`

1. `styled-components`的问题是只支持html，对于一些全局性的样式就无能为力
2. 不用关心`styled-components`的autoprefix问题，是支持的。
3. 使用`styled-components`最根本的原因是跨平台
4. 对于服务端渲染，需要使用`babel-plugin-styled-components`

`styled`的一些问题
