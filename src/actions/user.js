import { createAction } from 'redux-actions';
import { createFetchActions } from './utils';

export const loadCards = createAction('LOAD_CARDS');
export const cards = createFetchActions('CARDS');

export const addNewCard = createAction('ADD_NEW_CARD');
export const addNewCardSuccess = createAction('ADD_NEW_CARD_SUCCESS');

export const removeCard = createAction('REMOVE_CARD');
export const cardRemove = createFetchActions('CARD_REMOVE');
