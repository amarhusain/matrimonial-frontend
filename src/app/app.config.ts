import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
// import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { routes } from './app.routes';
import { mfInterceptorProvider } from './http-interceptors/mf-interceptor-provider';

const RECAPTCHA_V3_KEY = '6LdGTFEqAAAAADyIO7miN7Tf9_5TXKEAOZiV28nl';

/** Provider for the Google recaptch. */
// export const recaptchaProvider: Provider = {
//   provide: RECAPTCHA_SETTINGS,
//   useValue: {
//     siteKey: RECAPTCHA_V3_KEY,
//   } as RecaptchaSettings
// }


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    mfInterceptorProvider,
    // recaptchaProvider,
  ]
};
