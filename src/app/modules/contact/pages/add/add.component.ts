import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormUtils } from '../../../../utils/form.utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-add',
	standalone: false,
	templateUrl: './add.component.html',
	styleUrl: './add.component.scss'
})
export class AddComponent {
	protected contactForm!: FormGroup;
	protected isSubmited = false;
	protected isLoading = false;
	protected erro: Error | null = null;
	protected formUtils = FormUtils;

	constructor(
		private fb: FormBuilder,
		private contactService: ContactService,
		private alertService: AlertService,
		private authService: AuthService
	) {
		const userId = this.authService.getUserDecode()?.id;
		this.contactForm = this.fb.group({
			nome: ['', Validators.required, FormUtils.notEmpty],
			email: ['', [Validators.required, Validators.email]],
			celular: ['', Validators.required, FormUtils.notEmpty],
			telefone: ['', Validators.required, FormUtils.notEmpty],
			userId: [userId, Validators.required]
		});
	}

	protected onSubmit() {
		this.isSubmited = true;
		if (this.formUtils.valid(this.contactForm)) {
			this.isLoading = true;
			const data = this.contactForm.getRawValue();
			this.contactService.add(data).subscribe({
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
					this.alertService.addAlert('info', 'Contato criada com sucesso');
					this.erro = null;
					this.isLoading = false;
					this.isSubmited = false;
					this.contactForm.reset();
				}
			});
		} else {
			console.error('Inválid form');
		}
	}
}
