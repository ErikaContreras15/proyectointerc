
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      // Redireccionar a la página principal después de iniciar sesión
    });
  }
}
