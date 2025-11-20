import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, Usuario, Perfil } from '../services/auth.service';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'], 
})
export class Usuarios {
  nuevoUsuario: Usuario = {
    nombre: '',
    apellidos: '',
    username: '',
    password: '',
    direccion: '',
    fechaNacimiento: '',
    perfil: { nombre: '' }
  };

  constructor(private AuthService: AuthService, private router: Router) {}

  crearUsuario() {
    if (!this.nuevoUsuario.perfil.nombre) {
      alert('Debes seleccionar un perfil');
      return;
    }

    this.AuthService.crearUsuario(this.nuevoUsuario).subscribe({
      next: (res) => {
        alert('Usuario creado correctamente');
        this.router.navigate(['/admin-principal']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear usuario');
      }
    });
  }
 
}

