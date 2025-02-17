import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
	selector: 'app-section',
	imports: [CommonModule],
	templateUrl: './section.component.html'
})
export class SectionComponent {
	class = input<string>();
	classFn = computed(() => this.class());
}
