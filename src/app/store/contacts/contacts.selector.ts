import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IContactsStore } from '../../interfaces';

const state = createFeatureSelector<IContactsStore>('contacts');

export const getContacts = createSelector(state, (state: IContactsStore) => state);
export const getContactsError = createSelector(state, (state: IContactsStore) => state.error);
