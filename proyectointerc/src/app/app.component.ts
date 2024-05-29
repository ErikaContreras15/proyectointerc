import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyectointerciclo';
}
