import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { App } from './app/app';
import { userReducer } from './app/store/reducers/user.reducer';
import { UserEffects } from './app/store/effects/user.effects';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore({ users: userReducer }),
    provideEffects([UserEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        timeOut: 4000,
        progressBar: true,
        closeButton: true
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
});