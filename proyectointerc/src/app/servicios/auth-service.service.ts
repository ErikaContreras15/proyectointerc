import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, Auth, signOut, signInWithEmailAndPassword, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;

  constructor() {
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

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error);
      throw new Error(error.message);
    }
  }
  async logout(): Promise<void> {
    try {
      return await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  getAuthState() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, user => {
        resolve(user);
      }, reject);
    });
  }
  
}
