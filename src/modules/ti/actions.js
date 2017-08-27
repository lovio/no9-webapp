import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

// 获取题库目录
export const loadExerciseMenu = createAction('LOAD_EXERCISE_MENU');
export const exerciseMenu = createFetchActions('EXERCISE_MENU');

// 获取真题
export const loadExerciseQuestionPackage = createAction('LOAD_EXERCISE_QUESTION_PACKAGE');
export const exerciseQuestionPackage = createFetchActions('EXERCISE_QUESTION_PACKAGE');

// 获取话题列表
export const loadTiTopics = createAction('LOAD_TI_TOPICS');
export const tiTopics = createFetchActions('TI_TOPICS');

export const loadTiTopic = createAction('LOAD_TI_TOPIC');
export const tiTopic = createFetchActions('TI_TOPIC');

export const loadExerciseCounts = createAction('LOAD_EXERCISE_COUNTS');
export const exerciseCounts = createFetchActions('EXERCISE_COUNTS');

export const loadLatelyExercise = createAction('LOAD_LATELY_EXERCISE');
export const latelyExercise = createFetchActions('LATELY_EXERCISE');
