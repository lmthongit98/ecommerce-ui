import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";


const tokenInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    tokenInterceptorProvider,
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
  ],
};
