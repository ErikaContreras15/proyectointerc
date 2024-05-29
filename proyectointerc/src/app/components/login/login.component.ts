
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
    
  constructor(private authService: AuthService,
    private router: Router,
    
  ) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.errorMessage = error.message;
    });
  }

  async login(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Un error desconocido ocurrió';
      }
    }
  }
  
  
}
