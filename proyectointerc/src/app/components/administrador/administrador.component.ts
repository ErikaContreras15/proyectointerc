import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth-service.service'; // Importa tu servicio de autenticación

import { Libro } from '../../domain/Libro';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss',
})

export class AdministradorComponent implements OnInit {
  esAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.esAdmin = await this.authService.esAdministrador();
  }

  editarLibro(libro: Libro) {
    
  }
}