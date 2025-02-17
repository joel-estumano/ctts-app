import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./modules/layout/layout.component').then((c) => c.LayoutComponent),
		children: [
			{
				path: '',
				loadChildren: () => import('./modules/contact/contact.module').then((m) => m.ContactModule)
			}
		],
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/pages/login/login.component').then((c) => c.LoginComponent),
		title: 'Login'
	},
	{
		path: 'criar-conta',
		loadComponent: () => import('./auth/pages/register/register.component').then((c) => c.RegisterComponent),
		title: 'Criar conta'
	},
	{ path: '**', redirectTo: '' }
];
