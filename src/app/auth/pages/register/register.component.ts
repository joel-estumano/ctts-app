import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from '../../../utils/form.utils';
import { AuthService } from '../../../services/auth.service';
import { SectionComponent } from '../../../components/section/section.component';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-register',
	imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink, SectionComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	protected registerForm!: FormGroup;
	protected isSubmited = false;
	protected isLoading = false;
	protected erro: Error | null = null;
	protected formUtils = FormUtils;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertService: AlertService
	) {
		this.registerForm = this.fb.group({
			name: ['', Validators.required, FormUtils.notEmpty],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required, FormUtils.notEmpty]
		});
	}

	protected onSubmit() {
		this.isSubmited = true;
		if (this.formUtils.valid(this.registerForm)) {
			this.isLoading = true;
			const data = this.registerForm.getRawValue();
			this.authService.register(data).subscribe({
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
					this.alertService.addAlert('info', 'Conta criada com sucesso');
					this.erro = null;
					this.isLoading = false;
					this.isSubmited = false;
					this.registerForm.reset();
				}
			});
		} else {
			console.error('Inválid form');
		}
	}
}
