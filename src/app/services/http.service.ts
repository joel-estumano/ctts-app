import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private readonly apiURL: string;
	private readonly headers: HttpHeaders;

	private httpClient = inject(HttpClient);

	constructor() {
		this.apiURL = 'api';
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	}

	public get<T>(url: string): Observable<T> {
		return this.httpClient
			.get<T>(`${this.apiURL}/${url}`, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	public put<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.put<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	public patch<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.patch<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	public post<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.post<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	public delete<T>(url: string): Observable<T> {
		return this.httpClient
			.delete<T>(`${this.apiURL}/${url}`, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	private errorHandler(error: HttpErrorResponse): Observable<never> {
		if (error.error) {
			return throwError(() => error.error);
		}
		return throwError(() => error);
	}
}
