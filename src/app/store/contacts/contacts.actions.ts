import { createAction, props } from '@ngrx/store';
import { IContactData } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';

export const loadContacts = createAction('[Contacts] Load', props<{ search: string }>());
export const loadContactsSuccess = createAction('[Contacts] Load Success', props<{ result: IContactData[] }>());
export const loadContactsError = createAction('[Contacts] Load Error', props<{ error: HttpErrorResponse }>());

export const updateActiveStatus = createAction('[Contacts] Update Active Status', props<{ contactId: string; isActive: boolean }>());
export const updateFavoriteStatus = createAction('[Contacts] Update Favorite Status', props<{ contactId: string; isFavorite: boolean }>());

export const updateContactSuccess = createAction('[Contacts] Update Contact Success', props<{ contactId: string; changes: Partial<IContactData> }>());

export const loadContactById = createAction('[Contacts] Load Contact By ID', props<{ id: string }>());
export const loadContactByIdSuccess = createAction('[Contacts] Load Contact By ID Success', props<{ contact: IContactData }>());
export const loadContactByIdFailure = createAction('[Contacts] Load Contact By ID Failure', props<{ error: HttpErrorResponse }>());
