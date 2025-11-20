import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Perfil {
  nombre: string;
}

export interface Usuario {
  nombre: string;
  apellidos: string;
  username: string;
  password: string;
  direccion?: string;
  fechaNacimiento?: string;
  perfil: Perfil;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:9001';

  constructor(private http: HttpClient) {}

 
  
  /** REGISTRO normal */
  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/admin/listausu`);
  }
}


