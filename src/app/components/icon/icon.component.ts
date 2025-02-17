import { Component, computed, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as heroicons from '@ng-icons/heroicons/outline';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';
import { mergeClass } from '../../utils/merge-class';

export type IconName = keyof typeof heroicons | keyof typeof bootstrapIcons;

const mergeIcons = {
	...heroicons,
	...bootstrapIcons
};

@Component({
	selector: 'app-icon',
	imports: [NgIconComponent],
	templateUrl: './icon.component.html',
	providers: [provideIcons(mergeIcons)]
})
export class IconComponent {
	icon = input.required<IconName>();
	name = computed(() => this.icon());

	class = input<string>('');
	classCmp = computed(() => mergeClass(this.class()));
}
