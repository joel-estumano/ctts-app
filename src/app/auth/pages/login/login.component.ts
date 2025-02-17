import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SectionComponent } from '../../../components/section/section.component';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-login',
	imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink, SectionComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	protected loginForm!: FormGroup;
	protected isSubmited = false;
	protected isLoading = false;
	protected erro: Error | null = null;
	protected formUtils = FormUtils;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertService: AlertService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	protected onSubmit() {
		this.isSubmited = true;
		if (this.formUtils.valid(this.loginForm)) {
			this.isLoading = true;
			const data = this.loginForm.getRawValue();
			this.authService.login(data).subscribe({
				next: () => {
					this.router.navigate(['/']);
				},
				error: (err) => {
					this.erro = err;
					console.error('Error: ', err);
					this.alertService.addAlert('erro', err.message);
					this.isLoading = false;
					this.isSubmited = false;
				},
				complete: () => {
					this.erro = null;
					this.isLoading = false;
					this.isSubmited = false;
				}
			});
		} else {
			console.error('Inválid form');
		}
	}
}
