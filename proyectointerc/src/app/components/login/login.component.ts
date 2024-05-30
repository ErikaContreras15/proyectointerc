
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../domain/Usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corregido styleUrl a styleUrls
})
export class LoginComponent {
  errorMessage: string = '';
  usuario: Usuario = new Usuario();
    
  constructor(private authService: AuthService, private router: Router) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      this.router.navigate(['/inicio']);
    }).catch((error) => {
      this.errorMessage = error.message;
    });
  }

  async login(form: NgForm): Promise<void> {
    if (form.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    try {
      await this.authService.login(this.usuario.usuario!, this.usuario.contrasena!);
      this.router.navigate(['/inicio']); // Navega a la página de inicio después de iniciar sesión correctamente
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
