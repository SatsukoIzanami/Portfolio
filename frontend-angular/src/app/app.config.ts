import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // GitHub Pages is static hosting; hash routing avoids 404s on refresh/deep links.
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
