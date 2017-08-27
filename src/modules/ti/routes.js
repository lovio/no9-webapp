import Ti from './containers';
import TiExercise from './containers/exercise';
import TiTopics from './containers/topics';
import TiTopic from './containers/topic';

// 目前还没有想好是否有必要
export default [
  {
    path: '/ti/:subjectId',
    exact: true,
    component: Ti,
  }, {
    path: '/ti/:subjectId/exercise',
    exact: true,
    component: TiExercise,
  }, {
    path: '/ti/:subjectId/topics',
    exact: true,
    component: TiTopics,
  }, {
    path: '/ti/:subjectId/topics/:tagId',
    exact: true,
    component: TiTopic,
  },
];
