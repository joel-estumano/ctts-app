import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401 || error.status === 403) {
				authService.logout();
				router.navigate(['/login']);
				return throwError(() => new Error('Não autorizado!'));
			}
			return throwError(() => error);
		})
	);
};
