import { Component, computed, input, OnInit } from '@angular/core';
import { IContactData } from '../../interfaces';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadContactsError, updateActiveStatus, updateFavoriteStatus } from '../../store/contacts/contacts.actions';
import { getContactsError } from '../../store/contacts/contacts.selector';

@Component({
	selector: 'app-contact-card',
	imports: [FormsModule, ReactiveFormsModule, NgClass],
	templateUrl: './contact-card.component.html',
	styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent implements OnInit {
	contact = input.required<IContactData>();
	data = computed(() => this.contact());

	isActive = computed((): boolean => {
		return this.contact().snAtivo === 'S';
	});

	isFavorit = computed((): boolean => {
		return this.contact().snFavorito === 'S';
	});

	private previousActiveStatus!: boolean;
	private previousFavoriteStatus!: boolean;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.previousActiveStatus = this.isActive();
		this.previousFavoriteStatus = this.isFavorit();

		this.store.select(getContactsError).subscribe((error) => {
			if (error) {
				this.contact().snAtivo = this.previousActiveStatus ? 'S' : 'N';
				this.contact().snFavorito = this.previousFavoriteStatus ? 'S' : 'N';
			}
		});
	}

	updateActiveStatus(): void {
		this.previousActiveStatus = this.isActive();
		this.store.dispatch(updateActiveStatus({ contactId: this.contact().contatoId as string, isActive: !this.isActive() }));
	}

	updateFavoriteStatus(): void {
		this.previousFavoriteStatus = this.isFavorit();
		this.store.dispatch(updateFavoriteStatus({ contactId: this.contact().contatoId as string, isFavorite: !this.isFavorit() }));
	}
}
