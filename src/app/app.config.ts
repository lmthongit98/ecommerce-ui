import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";


const tokenInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    tokenInterceptorProvider,
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
  ],
};
