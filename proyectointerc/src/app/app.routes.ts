import { Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';


export const routes: Routes = [

  {path: 'inicio', title: 'Inicio', component: InicioComponent},
  {path: 'catalogo', title: 'Catalogo', component: CatalogoComponent},
  {path: 'carrito', title: 'Carrito', component: CarritoComponent},
  { path: 'registro', title: 'Registro', component: RegistroComponent },
  { path: 'login', title: 'Iniciar Sesión', component: LoginComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' } // Redirige a la página de registro por defecto

];
