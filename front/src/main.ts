import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
    ]
  })