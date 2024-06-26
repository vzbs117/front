import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fadeInOut } from '../../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut], // Aplica la animación al componente
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(false);
  user: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signOut() {
    this.afAuth.signOut();
  }

  navigateToTranslator() {
    this.router.navigate(['/translator']);
  }

  navigateToadm(){
    this.router.navigate(['/adm']);
  }
}
