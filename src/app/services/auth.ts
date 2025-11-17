import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:9001';

  constructor(private http: HttpClient) {}

    /** LOGIN con BASIC AUTH */
    login(username: string, password: string): Observable<any> {

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password)
      });
  
      return this.http.post(`${this.apiUrl}/api/usuarios/login`, {}, { headers });
    }
  
    /** REGISTRO normal */
    register(usuario: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/registro`, usuario);
    }
}


