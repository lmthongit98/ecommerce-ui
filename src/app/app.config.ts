import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";
import {adminRoutes} from "./components/admin/admin.routes";
import {provideNgxStripe} from "ngx-stripe";
import {environment} from "../environments/environment";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";


const tokenInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    tokenInterceptorProvider,
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forChild(adminRoutes)),
    provideNgxStripe(environment.stripe.publicKey),
    provideAnimations(),
    provideToastr({
      timeOut: 1500,
      positionClass:  'toast-top-right',
      preventDuplicates: true,
    }),
  ],
};
