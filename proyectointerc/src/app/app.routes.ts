import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  { path: 'registro', title: 'Registro', component: RegistroComponent },
  { path: 'login', title: 'Iniciar Sesión', component: LoginComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' } // Redirige a la página de registro por defecto
];
