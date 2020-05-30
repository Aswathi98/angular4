import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableRipple } from '@syncfusion/ej2-base';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


enableRipple(true);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));





