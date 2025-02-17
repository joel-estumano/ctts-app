import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from '../../components/section/section.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactCardComponent } from '../../components/contact-card/contact-card.component';

const routes: Routes = [
	{
		path: '',
		component: ListComponent
	},
	{
		path: 'novo',
		component: AddComponent,
		title: 'Novo contato'
	},
	{
		path: 'editar/:id',
		component: EditComponent,
		title: 'Editar'
	}
];

@NgModule({
	declarations: [ListComponent, AddComponent, EditComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SectionComponent, FormsModule, ReactiveFormsModule, ContactCardComponent]
})
export class ContactModule {}
