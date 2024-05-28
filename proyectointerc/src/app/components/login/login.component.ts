import { Component } from '@angular/core';

import { AuthService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private authService: AuthService) { }

  // Método para iniciar sesión con Google
  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      // Redireccionar a la página principal después de iniciar sesión
    });
  }


}
