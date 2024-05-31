export class Usuario {
  id: string = '';
  nombre: string = '';
  email: string = '';
  usuario: string = '';
  contrasena: string = '';
  rol?: 'cliente' | 'administrador' ; 
}