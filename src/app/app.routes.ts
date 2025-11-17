import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Register } from './register/register';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: Principal },
    { path: 'register', component: Register },
    { path: 'login', component: Login},
];
