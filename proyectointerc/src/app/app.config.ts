import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      projectId: "proyectointerc",
      appId: "1:493147539918:web:227156c8211394102e839f",
      storageBucket: "proyectointerc.appspot.com",
      apiKey: "AIzaSyDUEbkqrzAohecjMmpMGZ6uONGv8Q11cA0",
      authDomain: "proyectointerc.firebaseapp.com",
      messagingSenderId: "493147539918"
    })),
    provideFirestore(() => getFirestore())
  ]
};
