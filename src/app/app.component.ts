import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AlertComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private meta: Meta) {
		this.meta.addTags([
			{
				name: 'author',
				content: 'Joel Estumano'
			},
			{
				name: 'description',
				content: 'Gerenciador de contatos'
			}
		]);
	}
}
