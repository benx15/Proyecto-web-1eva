import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Perfil {
  nombre: string;
}

export interface Usuario {
  id: number;
  username: string;
  password?: string;
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  direccion?: string;
  perfil?: string;
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
  
}


