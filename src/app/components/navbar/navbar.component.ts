import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map de RxJS
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth,private router:Router) {
    // Inicializa la propiedad isLoggedIn$ con un valor predeterminado
    this.isLoggedIn$ = new Observable<boolean>();
  }

  ngOnInit(): void {
    // Asigna el observable del estado de autenticación del usuario a isLoggedIn$
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
  