import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const loadCards = createAction('LOAD_CARDS');
export const cards = createFetchActions('CARDS');

export const addNewCard = createAction('ADD_NEW_CARD');
export const addNewCardSuccess = createAction('ADD_NEW_CARD_SUCCESS');

export const removeCard = createAction('REMOVE_CARD');
export const cardRemove = createFetchActions('CARD_REMOVE');

export const updateProfile = createAction('UPDATE_PROFILE');
export const updateProfileSuccess = createAction('UPDATE_PROFILE_SUCCESS');
export const updateProfileFailure = createAction('UPDATE_PROFILE_FAILURE');

export const loadRelations = createAction('LOAD_RELATIONS');
export const relations = createFetchActions('RELATIONS');

export const chooseCard = createAction('CHOOSE_CARD');

export const withdraw = createAction('WITHDRAW');
export const withdrawSuccess = createAction('WITHDRAW_SUCCESS');

export const loadDailySummaries = createAction('LOAD_DAILY_SUMMARIES');
export const dailySummaries = createFetchActions('DAILY_SUMMARIES');
