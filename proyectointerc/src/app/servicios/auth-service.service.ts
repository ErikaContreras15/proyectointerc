
import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, Auth, signOut, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environments } from '../../environments';
import { Router } from '@angular/router';
import { Usuario } from '../domain/Usuario';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  private db: Firestore;

  constructor(private router: Router) {
    const app = initializeApp(environments.firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .catch(error => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  async registrar(correo: string, contraseña: string, nombre: string, usuario: string, rol: 'cliente' | 'administrador' = 'cliente') {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, correo, contraseña);
      const user = userCredential.user;
      const nuevoUsuario: Usuario = {
        id: user.uid,
        nombre,
        email: correo,
        usuario,
        contrasena: contraseña,
        rol,
      };
      await this.agregarUsuarioBD(nuevoUsuario);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  private async agregarUsuarioBD(usuario: Usuario) {
    try {
      const usuariosRef = collection(this.db, 'usuarios');
      await addDoc(usuariosRef, usuario);
    } catch (error) {
      console.error('Error al agregar usuario a la base de datos:', error);
    }
  }

  signOut() {
    return signOut(this.auth);
  }

  isAuthenticated() {
    return !!this.auth.currentUser;
  }

  async login(usuario: string, contrasena: string): Promise<void> {
    try {
      const usuariosRef = collection(this.db, 'usuarios');
      const q = query(usuariosRef, where('usuario', '==', usuario), where('contrasena', '==', contrasena));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new Error('Credenciales incorrectas');
      }
  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as Usuario;
  
      await signInWithEmailAndPassword(this.auth, userData.email, contrasena);
  
      const rol = userData.rol;
      if (rol === 'cliente') {
        this.router.navigate(['/cliente']);
      } else if (rol === 'administrador') {
        this.router.navigate(['/admin']);
      }
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

  getAuthState(): Observable<User | null> {
    return authState(this.auth); 
  }

  async getRolUsuario(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.db, `usuarios/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      return userData ? userData['rol'] : null;
    }
    return null;
  }


  async getUsuario(uid: string): Promise<Usuario> {
    try {
      const userDocRef = doc(this.db, 'usuarios', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data() as Usuario;
      } else {
        throw new Error('El usuario no existe en la base de datos');
      }
    } catch (error) {
      throw error;
    }
  }

  async actualizarUsuario(usuario: Usuario): Promise<void> {
    try {
      const { id, ...userData } = usuario;
      const userDocRef = doc(this.db, 'usuarios', usuario.id);
      await updateDoc(userDocRef, userData); 
    } catch (error) {
      throw error;
    }
  }

  cargarInformacionUsuario(): Promise<Usuario> {
    return new Promise<Usuario>((resolve, reject) => {
      const user = this.auth.currentUser;
      if (user) {
        const usuario: Usuario = {
          id: user.uid,
          nombre: user.displayName || '',
          email: user.email || '',
          usuario: user.displayName || '',
          contrasena: '',
          rol: 'cliente'
        };
        resolve(usuario);
      } else {
        reject('No hay usuario autenticado');
      }
    });
  }

  actualizarNombreUsuario(nombre: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, { displayName: nombre });
    } else {
      return Promise.reject('No hay usuario autenticado');
    }
  }

  async esAdministrador(): Promise<boolean> {
    try {
      const rol = await this.getRolUsuario();
      return rol === 'administrador';
    } catch (error) {
      console.error('Error al verificar si el usuario es administrador:', error);
      throw error;
    }
  }
}  