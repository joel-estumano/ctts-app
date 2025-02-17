import { HttpErrorResponse } from '@angular/common/http';
import { IContactData } from './contact-data.interface';

export interface IContactsStore {
	result: IContactData[];
	isLoading?: boolean;
	error?: HttpErrorResponse | null;
}
