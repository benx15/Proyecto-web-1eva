import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './login.html',
  providers: [AuthService],
  styleUrls: ['./login.css'],
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Creamos el formulario con validación básica
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Función que se llama al hacer submit
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.errorMessage = null;

    

    this.authService.login(email, password).subscribe({
      next: user => {
        // Redirigir según rol
        if (user.perfil.nombre === 'ROLE_ADMON') {
          this.router.navigate(['/admin-principal']);
        } else if (user.perfil.nombre === 'ROLE_CLIENTE') {
          this.router.navigate(['/cliente-principal']);
        } else if (user.perfil.nombre === 'ROLE_TRABAJADOR') {
          this.router.navigate(['/trabajador-principal']);
        } else if (user.perfil.nombre == 'ROLE_JEFE') {
          this.router.navigate(['/jefe-principal']);
        } else {
          this.router.navigate(['/']);
        }
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Email o Contraseña Incorrectos';
        this.loading = false;
      }
    });
  }
}
