import mitt from 'mitt';

// 基础组件，很多helpers里面都用了，要注意交叉引用的问题
// 格式规范
// Mitt.emit('share', {
//   type: 'timeline',
//   result: 'success',
// });
// 可能放在helpers里面并不是太合适
export default mitt();
