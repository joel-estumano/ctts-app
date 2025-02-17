import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUtils } from '../../../../utils/form.utils';
import { ContactService } from '../../services/contact.service';
import { AlertService } from '../../../../services/alert.service';
import { Store } from '@ngrx/store';
import { loadContactById } from '../../../../store/contacts/contacts.actions';
import { selectContactById } from '../../../../store/contacts/contacts.selector';
import { IContactData } from '../../../../interfaces';
import { catchError, of } from 'rxjs';

@Component({
	selector: 'app-edit',
	standalone: false,
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
	id!: string;

	protected editForm!: FormGroup;
	protected isSubmited = false;
	protected isLoading = false;
	protected erro: Error | null = null;
	protected formUtils = FormUtils;

	constructor(
		private fb: FormBuilder,
		private contactService: ContactService,
		private alertService: AlertService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store
	) {
		this.editForm = this.fb.group({
			nome: ['', Validators.required, FormUtils.notEmpty],
			email: ['', [Validators.required, Validators.email]],
			celular: ['', Validators.required, FormUtils.notEmpty],
			telefone: ['', Validators.required, FormUtils.notEmpty]
		});
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.id = params.get('id')!;
			this.store.dispatch(loadContactById({ id: this.id }));
			this.store
				.select(selectContactById(this.id))
				.pipe(
					catchError(() => {
						this.router.navigate(['/']);
						return of(undefined);
					})
				)
				.subscribe((contact: IContactData | undefined) => {
					if (contact) {
						this.editForm.patchValue(contact);
					} else {
						this.router.navigate(['/']);
					}
				});
		});
	}

	protected onSubmit() {
		this.isSubmited = true;
		if (this.formUtils.valid(this.editForm)) {
			this.isLoading = true;
			const data = this.editForm.getRawValue();
			this.contactService.edit(data, this.id).subscribe({
				next: (response) => {
					console.log(response);
				},
				error: (err) => {
					this.erro = err;
					console.error('Error: ', err);
					this.alertService.addAlert('erro', err.message);
					this.isLoading = false;
					this.isSubmited = false;
				},
				complete: () => {
					this.alertService.addAlert('info', 'Contato atualizado com sucesso');
					this.erro = null;
					this.isLoading = false;
					this.isSubmited = false;
					//this.editForm.reset();
				}
			});
		} else {
			console.error('Inválid form');
		}
	}
}
