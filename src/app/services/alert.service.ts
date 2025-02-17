import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
	message: string;
	type: 'info' | 'erro';
}

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	private alerts: Alert[] = [];
	private alertsSubject = new BehaviorSubject<Alert[]>(this.alerts);

	getAlerts(): Observable<Alert[]> {
		return this.alertsSubject.asObservable();
	}

	addAlert(type: 'info' | 'erro', message: string): void {
		this.alerts.push({ message, type });
		this.alertsSubject.next(this.alerts);
	}

	removeAlert(index: number): void {
		this.alerts.splice(index, 1);
		this.alertsSubject.next(this.alerts);
	}

	clearAlerts(): void {
		this.alerts = [];
		this.alertsSubject.next(this.alerts);
	}
}
