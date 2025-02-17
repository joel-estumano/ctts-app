import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	loadContactById,
	loadContactByIdFailure,
	loadContactByIdSuccess,
	loadContacts,
	loadContactsError,
	loadContactsSuccess,
	updateActiveStatus,
	updateContactSuccess,
	updateFavoriteStatus
} from './contacts.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IContactData } from '../../interfaces';
import { ContactService } from '../../modules/contact/services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ContactsEffects {
	constructor(
		private actions$: Actions,
		private contactService: ContactService
	) {}

	loadContacts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadContacts),
			mergeMap((action) => {
				return this.contactService.list(action.search).pipe(
					map((contacts: IContactData[]) => loadContactsSuccess({ result: contacts })),
					catchError((error: HttpErrorResponse) => of(loadContactsError({ error })))
				);
			})
		);
	});

	updateActiveStatus$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateActiveStatus),
			mergeMap((action) => {
				return this.contactService.updateActiveStatus(action.contactId, action.isActive).pipe(
					map(() => updateContactSuccess({ contactId: action.contactId, changes: { snAtivo: action.isActive ? 'S' : 'N' } })),
					catchError((error: HttpErrorResponse) => of(loadContactsError({ error })))
				);
			})
		);
	});

	updateFavoriteStatus$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateFavoriteStatus),
			mergeMap((action) => {
				return this.contactService.updateFavoriteStatus(action.contactId, action.isFavorite).pipe(
					map(() => updateContactSuccess({ contactId: action.contactId, changes: { snFavorito: action.isFavorite ? 'S' : 'N' } })),
					catchError((error: HttpErrorResponse) => of(loadContactsError({ error })))
				);
			})
		);
	});

	loadContactById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadContactById),
			mergeMap((action) =>
				this.contactService.getContactById(action.id).pipe(
					map((contact) => loadContactByIdSuccess({ contact })),
					catchError((error) => of(loadContactByIdFailure({ error })))
				)
			)
		)
	);
}
