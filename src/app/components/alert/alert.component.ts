import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../services/alert.service';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-alert',
	imports: [NgClass, IconComponent],
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
	alerts: Alert[] = [];

	constructor(private alertService: AlertService) {}

	ngOnInit(): void {
		this.alertService.getAlerts().subscribe((alerts) => (this.alerts = alerts));
	}

	removeAlert(index: number): void {
		this.alertService.removeAlert(index);
	}
}
