import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../../animations/login.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation] // Agregar la animación a la lista de animaciones
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; // Variable para controlar la animación de carga

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private location: Location // Inyección del servicio Location
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        this.isLoading = true; // Activar la animación de carga
        await this.afAuth.signInWithEmailAndPassword(email, password);
        // Inicio de sesión exitoso, redirigir al usuario al Home
        this.router.navigate(['/']);
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false; // Desactivar la animación de carga, independientemente del resultado
      }
    }
  }
  
  async forgotPassword() {
    const email = this.loginForm.get('email')?.value;

    try {
      await this.afAuth.sendPasswordResetEmail(email);
      // Mostrar un mensaje al usuario de que se ha enviado un correo electrónico para restablecer la contraseña
      this.errorMessage = 'Se ha enviado un correo electrónico para restablecer la contraseña.';
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
  
  // Método para regresar a la pantalla anterior
  goBack(): void {
    this.location.back();
  }
}
