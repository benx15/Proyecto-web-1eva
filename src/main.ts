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


const routes = [
  { path: '', component: Principal },
  { path: 'register', component: Register },
  { path: 'login', component: Login},
  { path: 'admin-principal', component: AdminPrincipal},
  { path: 'usuarios', component: Usuarios},
];


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));