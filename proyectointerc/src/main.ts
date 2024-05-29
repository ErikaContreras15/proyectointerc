import { initializeApp } from 'firebase/app';
import { environments } from './environments';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

// Inicializa Firebase con la configuración
initializeApp(environments.firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
