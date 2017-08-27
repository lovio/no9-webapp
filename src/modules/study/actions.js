import { createAction } from 'redux-actions';
import { createFetchActions } from 'actions/utils';

export const loadStudyRecords = createAction('LOAD_STUDY_RECORDS');
export const studyRecords = createFetchActions('STUDY_RECORDS');
