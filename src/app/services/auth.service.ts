import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'client';
  name: string;
}
export interface LoginResponse {
  user: User;
  token: string;
}
//@Injectable({
  providedIn: 'root'// Cambiar por nuestro root antes de usar y remover barra de comentarios
//})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'https://localhost:9001';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
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

  login(email: string, password: string): Observable<User> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          // Guardar usuario y token en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          return response.user;
        })
      );
  }
}
