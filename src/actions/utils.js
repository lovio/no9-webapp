import { createAction } from 'redux-actions';

// base is something like MY_CAREER;
export function createFetchActions(base) {
  return {
    // request(data)
    request: createAction(`${base}_REQUEST`),
    // 这里的params是请求时传入的参数，如果传入的时候是一个payload: string，那么meta也是string，所以尽量避免直接传入值
    success: createAction(`${base}_SUCCESS`, ({ response }) => response, ({ params }) => params),
    failure: createAction(`${base}_FAILURE`, ({ error }) => error, ({ params }) => params),
  };
}
