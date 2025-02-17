import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
	InMemoryScrollingFeature,
	InMemoryScrollingOptions,
	provideRouter,
	TitleStrategy,
	withComponentInputBinding,
	withInMemoryScrolling
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CustomTitleStrategy } from '../strategies/title.strategy';

const scrollConfig: InMemoryScrollingOptions = {
	scrollPositionRestoration: 'enabled',
	anchorScrolling: 'enabled'
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

registerLocaleData(ptBr);

import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';

import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { errorInterceptor } from './auth/interceptors/error.interceptor';
import { provideStore } from '@ngrx/store';
import { contactsReducer } from './store/contacts/contacts.reducer';
import { provideEffects } from '@ngrx/effects';
import { ContactsEffects } from './store/contacts/contacts.effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
		provideClientHydration(withIncrementalHydration()),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
		{ provide: TitleStrategy, useClass: CustomTitleStrategy },
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		provideNgxWebstorage(withNgxWebstorageConfig({ prefix: 'ctts-app', separator: ':', caseSensitive: true }), withLocalStorage(), withSessionStorage()),
		provideStore({
			contacts: contactsReducer
		}),
		provideEffects([ContactsEffects])
	]
};
