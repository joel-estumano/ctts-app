import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable } from 'rxjs';
import { IContactAdd, IContactData } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	constructor(
		private httpService: HttpService,
		private authService: AuthService
	) {}

	add(data: IContactAdd): Observable<void> {
		return this.httpService.post('contatos', data);
	}

	list(search: string = ''): Observable<IContactData[]> {
		const userId = this.authService.getUserDecode()?.id;
		return this.httpService.get<IContactData[]>(`contatos/${userId}?search=${search}`);
	}

	updateActiveStatus(contactId: string, isActive: boolean): Observable<void> {
		return this.httpService.patch<{ snAtivo: 'S' | 'N' }, void>(`contatos/${contactId}/ativar`, { snAtivo: isActive ? 'S' : 'N' });
	}

	updateFavoriteStatus(contactId: string, isFavorite: boolean): Observable<void> {
		return this.httpService.patch<{ snFavorito: 'S' | 'N' }, void>(`contatos/${contactId}/favorito`, { snFavorito: isFavorite ? 'S' : 'N' });
	}
}
