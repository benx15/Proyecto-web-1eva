import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Register } from './register/register';
import { Login } from './login/login';
import { AdminPrincipal } from './admin-principal/admin-principal';
import { Usuarios } from './usuarios/usuarios';

export const routes: Routes = [
    { path: '', component: Principal,  },
    { path: 'principal', component: Principal },
    { path: 'register', component: Register },
    { path: 'login', component: Login},
    { path: 'admin-principal', component: AdminPrincipal},
    { path: 'usuarios', component: Usuarios},
];
