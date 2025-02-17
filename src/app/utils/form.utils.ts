import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class FormUtils {
	/**
	 * @description
	 * Adiciona a classe 'invalid' ao controle se ele estiver sujo (dirty) ou tocado (touched) e inválido.
	 *
	 * @param control - O controle do formulário a ser validado.
	 * @param submitted - Um parâmetro booleano opcional para indicar se o formulário foi submetido.
	 * @returns Um objeto com a classe 'invalid' definida se a condição for satisfeita.
	 */
	public static invalidClass(control: AbstractControl, submitted = true): Record<string, boolean> {
		return {
			'is-invalid': (control.dirty || control.touched) && control.invalid && submitted
		};
	}

	/**
	 * @description
	 * Marca todos os controles dentro de um FormGroup como sujos (dirty) e verifica a validade do formulário.
	 *
	 * @param form - O FormGroup a ser validado.
	 * @returns Um booleano indicando se o formulário é válido.
	 */
	public static valid(form: FormGroup): boolean {
		Object.keys(form.controls).forEach((controlName) => {
			const control = form.get(controlName);
			if (control) {
				if (control instanceof FormGroup) {
					this.valid(control);
				} else if (control instanceof FormArray) {
					control.controls.forEach((controlGroup) => {
						this.valid(controlGroup as FormGroup);
					});
				}
				control.markAsDirty();
			}
		});
		return form.valid;
	}

	/**
	 * @description
	 * Validador que exige que o controle tenha um valor não vazio.
	 *
	 * @usageNotes
	 *
	 * ### Validar que o campo não está vazio
	 *
	 * ```ts
	 * const control = new FormControl('', FormUtils.notEmpty);
	 * console.log(control.errors); // { empty: true }
	 * ```
	 *
	 * @returns Um mapa de erros com a propriedade `empty`
	 * se a validação falhar, caso contrário `null`.
	 *
	 * @see {@link updateValueAndValidity()}
	 */
	static notEmpty(control: AbstractControl): Observable<ValidationErrors | null> {
		const value = control.value;

		if (typeof value !== 'string' || !value.trim()) {
			return of({ empty: true });
		}

		return of(null);
	}

	/**
	 * Obtém um controle do formulário.
	 *
	 * @param form O grupo de formulários do qual obter o controle.
	 * @param name O nome do controle a ser obtido.
	 * @returns O controle do formulário correspondente ao nome fornecido.
	 *
	 * @usageNotes
	 *
	 * ### Exemplo de uso
	 *
	 * ```ts
	 * const control = FormUtils.getControl(myForm, 'email');
	 * console.log(control.value); // valor do controle 'email'
	 * ```
	 */
	static getControl(form: FormGroup, name: string): AbstractControl {
		return form.controls[name];
	}
}
