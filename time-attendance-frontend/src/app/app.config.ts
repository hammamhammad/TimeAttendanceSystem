import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AppTitleStrategy } from './core/title/app-title.strategy';
import { FilterInitializationService } from './core/services/filter-initialization.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (filterInitService: FilterInitializationService) => () => {
        console.log('Initializing filter configurations...');
        return Promise.resolve();
      },
      deps: [FilterInitializationService],
      multi: true
    }
  ]
};
