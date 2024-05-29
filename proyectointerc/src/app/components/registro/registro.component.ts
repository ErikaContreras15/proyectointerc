

import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  tipo: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.errorMessage = ''; 
    if (!form.valid) {
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return; 
    }

    this.authService.registrar(this.email, this.password)
      .then(() => {
        this.router.navigate(['/login']); 
      })
      .catch(error => {
        this.errorMessage = 'Error al registrar usuario: ' + error.message;
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']); 
  }
}
