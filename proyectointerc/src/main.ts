import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Asegúrate de que este sea el nombre correcto de tu módulo AppModule
import { initializeApp } from 'firebase/app';
import { environments } from './environments';

// Inicializa Firebase con la configuración
initializeApp(environments.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
