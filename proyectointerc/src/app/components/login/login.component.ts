
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      // Redireccionar a la página principal después de iniciar sesión
    });
  }
}
