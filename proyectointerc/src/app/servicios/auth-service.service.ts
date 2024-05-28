import { Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  constructor() { }

  // Método para iniciar sesión con Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Método para cerrar sesión
  signOut() {
    return signOut(this.auth);
  }
}
