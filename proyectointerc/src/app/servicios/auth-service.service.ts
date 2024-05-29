import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, Auth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;

  constructor() {
    // Inicializa Firebase si no está inicializado
    const app = initializeApp(environments.firebaseConfig);
    this.auth = getAuth(app);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .catch(error => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  registrar(correo: string, contraseña: string) {
    return createUserWithEmailAndPassword(this.auth, correo, contraseña)
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  }

  signOut() {
    return signOut(this.auth);
  }

  isAuthenticated() {
    return !!this.auth.currentUser;
  }
}
