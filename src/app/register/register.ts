import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  constructor(private auth: Auth) {}   // ← USAR Auth AQUÍ

  register(formData: any) {
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      fechaNacimiento: formData.fecha_nacimiento,
      direccion: formData.direccion
    };

    this.auth.register(user).subscribe({
      next: (res) => console.log("Registro OK", res),
      error: (err) => console.error("Error en registro", err)
    });
  }
}
