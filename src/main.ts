import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { Principal } from './app/principal/principal';
import { Register } from './app/register/register';
import { Login } from './app/login/login';
import { Component } from '@angular/core';
import { appConfig } from './app/app.config';
import { AdminLogin } from './app/admin-login/admin-login';
import { AdminPrincipal } from './app/admin-principal/admin-principal';
import { Usuarios } from './app/usuarios/usuarios';
import { provideHttpClient , withFetch } from '@angular/common/http'; // <-- IMPORTANTE
import { GestionarUsuarios } from './app/gestionar-usuarios/gestionar-usuarios';
import { TablaUsuarios } from './app/tabla-usuarios/tabla-usuarios';
import { ClientePrincipal } from './app/cliente-principal/cliente-principal';
import { JefePrincipal } from './app/jefe-principal/jefe-principal';
import { TrabajadorPrincipal } from './app/trabajador-principal/trabajador-principal';
import { Logout } from './app/logout/logout';



const routes = [
  { path: '', component: Principal },
  { path: 'register', component: Register },
  { path: 'login', component: Login},
  { path: 'admin-principal', component: AdminPrincipal},
  { path: 'usuarios', component: Usuarios},
  { path: 'gestionar-usuarios', component: GestionarUsuarios},
  { path: 'tabla-usuarios', component: TablaUsuarios},
  { path: 'cliente-principal', component: ClientePrincipal},
  { path: 'jefe-principal', component: JefePrincipal},
  { path: 'trabajador-principal', component: TrabajadorPrincipal},
  { path: 'logout', component: Logout},
];


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) 
  ]
})
.catch(err => console.error(err));