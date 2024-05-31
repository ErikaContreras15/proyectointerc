import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../domain/Usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario: Usuario = new Usuario();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.usuario.rol = 'cliente'; // Valor predeterminado para rol
  }

  onSubmit(form: NgForm) {
    this.errorMessage = ''; 
    if (!form.valid) {
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      console.log('Formulario inválido');
      return;
    }

    if (this.usuario.contrasena.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      console.log('Contraseña muy corta');
      return; 
    }

    console.log('Datos del usuario a registrar:', this.usuario);

    this.authService.registrar(this.usuario.email, this.usuario.contrasena, this.usuario.nombre, this.usuario.usuario, this.usuario.rol)
      .then(() => {
        console.log('Registro exitoso');
        this.router.navigate(['/login']); 
      })
      .catch(error => {
        this.errorMessage = 'Error al registrar usuario: ' + error.message;
        console.log('Error al registrar usuario:', error.message);
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']); 
  }
}
