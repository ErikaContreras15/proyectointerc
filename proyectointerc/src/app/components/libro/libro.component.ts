import { Component, OnInit } from '@angular/core';
 import { Libro } from '../../domain/Libro';
import { LibroService } from '../../servicios/libro.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss'
})
export class LibroComponent implements OnInit {
  libros$: Observable<Libro[]> = new Observable<Libro[]>();

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libros$ = this.libroService.getLibros();
  }

  async eliminarLibro(id: string) {
    try {
      await this.libroService.deleteLibro(id);
      console.log('Libro eliminado exitosamente.');
      this.cargarLibros();
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  }
}