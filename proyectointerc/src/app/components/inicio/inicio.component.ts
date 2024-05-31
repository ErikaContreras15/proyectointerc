import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../domain/Usuario';
import { AuthService } from '../../servicios/auth-service.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{
  usuario: Usuario = new Usuario();
  edicionHabilitada: boolean = false;
  errorMessage: string = '';
  nuevoNombre: string = '';
  esCliente: boolean = false; 
  mostrarInfoUsuario: boolean = false;
  
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarInformacionUsuario();
    this.checkAuthState();
  }


  async checkAuthState() {
    try {
      const user = await firstValueFrom(this.authService.getAuthState());
      if (user) {
        console.log('El usuario ha iniciado sesión:', user);
      } else {
        console.log('Ningún usuario ha iniciado sesión.');
      }
    } catch (error) {
      console.error('Error al comprobar el estado de autenticación:', error);
    }
  }



  habilitarEdicion() {
    this.edicionHabilitada = true;
  }

  guardarCambios() {
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.usuario) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.authService.actualizarUsuario(this.usuario)
      .then(() => {
        this.edicionHabilitada = false;
      })
      .catch(error => {
        console.error('Error al actualizar la información del usuario:', error);
        this.errorMessage = 'Error al guardar los cambios. Por favor, inténtelo de nuevo.';
      });
  }


  async cargarInformacionUsuario() {
    try {
      const user = await firstValueFrom(this.authService.getAuthState());
      if (user) {
        const usuario = await this.authService.cargarInformacionUsuario();
        this.usuario = usuario;
        //this.esCliente = usuario.rol === 'cliente';
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al cargar la información del usuario:', error);
    }
  }

  

  actualizarNombreUsuario() {
    this.authService.actualizarNombreUsuario(this.nuevoNombre)
      .then(() => {
        console.log('Nombre de usuario actualizado');
        this.cargarInformacionUsuario(); // Vuelve a cargar la información del usuario después de actualizar el nombre
      })
      .catch(error => {
        console.error('Error al actualizar el nombre del usuario:', error);
      });
  }

  
  toggleUserInfo(): void {
    this.mostrarInfoUsuario = !this.mostrarInfoUsuario;
  }
  
  
  






}
