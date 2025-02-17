import { createReducer, on } from '@ngrx/store';
import { loadContacts, loadContactsError, loadContactsSuccess, updateContactSuccess } from './contacts.actions';
import { IContactsStore } from '../../interfaces';

export const initialState: IContactsStore = {
	isLoading: false,
	error: null,
	result: []
};

export const contactsReducer = createReducer(
	initialState,
	on(loadContacts, (state) => ({
		...state,
		isLoading: true,
		error: null
	})),
	on(loadContactsSuccess, (state, { result }) => ({
		...state,
		result,
		isLoading: false,
		error: null
	})),
	on(loadContactsError, (state, { error }) => ({
		...state,
		isLoading: false,
		error
	})),
	on(updateContactSuccess, (state, { contactId, changes }) => {
		const updatedContacts = state.result.map((contact) => (contact.contatoId === contactId ? { ...contact, ...changes } : contact));
		return {
			...state,
			result: updatedContacts,
			error: null
		};
	})
);
