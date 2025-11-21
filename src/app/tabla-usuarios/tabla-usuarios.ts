import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../services/auth.service';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './tabla-usuarios.html',
  styleUrls: ['./tabla-usuarios.css']
})
export class TablaUsuarios implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  error: string = '';

  // Paginación simple
  paginaActual: number = 1;
  itemsPorPagina: number = 5;

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.usuarios.slice(inicio, inicio + this.itemsPorPagina);
  }

  siguientePagina(): void {
    if (this.paginaActual * this.itemsPorPagina < this.usuarios.length) {
      this.paginaActual++;
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.usuarios.length / this.itemsPorPagina);
  }
}
