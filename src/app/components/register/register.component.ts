import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Location } from '@angular/common';
import { slideInAnimation } from '../../animations/reg.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [slideInAnimation]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  error: any; // Definir explícitamente el tipo de la variable error

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private location: Location,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { 'mismatch': true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        await userCredential.user?.sendEmailVerification(); // Enviar correo de verificación
        this.showSuccessAlert();
      } catch (error: any) { // Definir explícitamente el tipo de la variable error
        this.errorMessage = error.message;
      }
    }
  }

  async showSuccessAlert() {
    alert('Revisa tu correo para verificar');
    await this.afAuth.signOut(); // Cerrar sesión para asegurar que el usuario no pueda ingresar sin verificar
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back(); // Regresar a la pantalla anterior
  }
}
