

import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres.');
      return; // Detener el proceso de registro si la contraseña es demasiado corta
    }

    this.authService.registrar(this.email, this.password)
      .then(() => {
        console.log('Usuario registrado exitosamente');
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirecciona al componente de inicio de sesión
  }
}
