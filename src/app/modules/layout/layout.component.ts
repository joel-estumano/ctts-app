import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';
import { AuthService } from '../../services/auth.service';
import { IUserDecode } from '../../interfaces';

@Component({
	selector: 'app-layout',
	imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
	userDecode!: IUserDecode | null;
	constructor(private authService: AuthService) {}
	ngOnInit(): void {
		this.userDecode = this.authService.getUserDecode();
	}
}
