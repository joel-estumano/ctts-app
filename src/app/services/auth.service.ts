import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpService } from './http.service';
import { Observable, tap } from 'rxjs';
import { IUserDecode, IUserLogin, IUserRegister } from '../interfaces';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface ITokenResult {
	token: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private localSt: LocalStorageService,
		private httpService: HttpService,
		private router: Router
	) {}

	register(data: IUserRegister): Observable<void> {
		return this.httpService.post('auth/register', data);
	}

	login(data: IUserLogin): Observable<ITokenResult> {
		return this.httpService.post<IUserLogin, ITokenResult>('auth/login', data).pipe(tap((res) => this.setToken(res.token)));
	}

	logout(): void {
		this.localSt.clear('token');
		this.router.navigate(['/login']);
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		if (!token) {
			return false;
		}
		const decodedToken = this.decodeToken(token);
		const currentTime = Math.floor(Date.now() / 1000);
		return decodedToken.exp > currentTime;
	}

	private setToken(token: string): void {
		this.localSt.store('token', token);
	}

	getToken(): string | null {
		return this.localSt.retrieve('token');
	}

	private decodeToken(token: string): IUserDecode {
		return jwtDecode(token);
	}

	getUserDecode(): IUserDecode | null {
		const token = this.getToken();
		if (!token) {
			return null;
		}
		return this.decodeToken(token);
	}
}
