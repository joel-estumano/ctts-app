import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IContactsStore } from '../../../../interfaces';
import { loadContacts } from '../../../../store/contacts/contacts.actions';
import { getContacts } from '../../../../store/contacts/contacts.selector';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-list',
	standalone: false,
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	searchControl: FormControl = new FormControl('');
	contactsStore$!: Observable<IContactsStore>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.loadContacts('');
		this.contactsStore$ = this.store.select(getContacts);
		this.searchControl.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged(),
				switchMap((search: string) => {
					this.loadContacts(search);
					return this.contactsStore$;
				})
			)
			.subscribe();
	}

	loadContacts(search: string): void {
		this.store.dispatch(loadContacts({ search }));
	}
}
