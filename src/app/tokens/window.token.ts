import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window.token', {
	factory: () => {
		if (typeof window !== 'undefined') {
			return window;
		}
		return new Window();
	}
});
