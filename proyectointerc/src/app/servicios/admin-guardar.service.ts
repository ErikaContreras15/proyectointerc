import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class AdminGuardarService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const esAdmin = await this.authService.esAdministrador();
      if (esAdmin) {
        return true;
      } else {
        this.router.navigate(['/inicio']);
        return false;
      }
    } catch (error) {
      console.error('Error al verificar si el usuario es administrador:', error);
      return false;
    }
  }
}
