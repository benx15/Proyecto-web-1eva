import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';


export interface Perfil {
  idPerfil: number;
  nombre: string;
}

export interface Usuario {
  nombre: string;
  apellidos: string;
  username: string;
  password: string;
  direccion?: string;
  fechaNacimiento?: string;
  fechaRegistro?: string
  perfil: Perfil;
}
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'client' | 'trabajador'|'jefe';
  name: string;
  token?: string; // Added optional token property
}
export interface LoginResponse {
  user: User;
  token: string;
}
@Injectable({
  providedIn: 'root'// Cambiar por nuestro root antes de usar y remover barra de comentarios
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:9001';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = (typeof window !== 'undefined' && localStorage.getItem('currentUser'))
  ? localStorage.getItem('currentUser')
  : null;
    let parsedUser: User | null = null;
    try{
      parsedUser = storedUser  ? JSON.parse(storedUser) : null;
    } catch {
      parsedUser = null;
    }

  this.currentUserSubject = new BehaviorSubject<User | null>(parsedUser);
  this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue (): User | null{
    return this.currentUserSubject.value
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });
  
    return this.http.post<any>(`${this.apiUrl}/api/usuarios/login`, null, { headers })
      .pipe(
        map(response => {
          const userWithPassword = { ...response, password };
          localStorage.setItem('currentUser', JSON.stringify(userWithPassword));
          this.currentUserSubject.next(userWithPassword);
          return userWithPassword;
        })
      );
  }


  logout(): Observable<any> {
    const currentUser = this.currentUserValue;
    
    if (!currentUser) {
      this.clearAuthData();
      return new Observable(observer => {
        observer.next({ message: 'Sesión cerrada' });
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + currentUser.token
    });

    return this.http.post<any>(`${this.apiUrl}/api/logout`, {}, { headers })
      .pipe(
        map(response => {
          this.clearAuthData();
          return response;
        })
      );
  }

  private clearAuthData(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.password) {
      throw new Error('Usuario no logueado');
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(currentUser.username + ':' + currentUser.password)
    });
  
    return this.http.post<Usuario>(
      'http://localhost:9001/admin/crearusu',
      usuario,
      { headers }
    );
  
  }

  listarUsuarios(): Observable<Usuario[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(currentUser.username + ':' + currentUser.password)
    });
    return this.http.get<Usuario[]>(`${this.apiUrl}/admin/listausu`, { headers });
  }
}
