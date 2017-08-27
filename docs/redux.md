Redux说明
========

1. 使用的`redux-saga`和`redux-actions`这两个库已经融合的非常好了。已经不再需要常量了。

2. 在redux的reducer中可以直接传递action,因为`redux-actions`已经做了处理。
  如果是action，就会调用action.prototype.toStrings来获取其定义使用的常量

3. 为了更好的进行模块化，可以考虑使用[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
来做一个封装，比如moduels下的每一个模块，不再有actions.js和reducers.js，而是ducks.js
