import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-translationlist',
  templateUrl: './translationlist.component.html',
  styleUrls: ['./translationlist.component.css']
})
export class TranslationlistComponent implements OnInit {
  translations: any[] = [];
  displayedColumns: string[] = ['sourceText', 'translatedText', 'actions'];
  isLoggedIn$: Observable<boolean> = of(false);
  user: any;

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private location: Location,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getTranslations();
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  getTranslations(): void {
    this.translationService.getAllTranslations().subscribe(
      (data) => {
        this.translations = data;
      },
      (error) => {
        console.error('Error fetching translations', error);
      }
    );
  }

  editTranslation(id: string): void {
    this.router.navigate(['/translations/edit', id]);
  }

  confirmDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta traducción?')) {
      this.translationService.deleteTranslation(id).subscribe(
        () => {
          this.translations = this.translations.filter((t) => t._id !== id);
        },
        (error) => {
          console.error('Error deleting translation', error);
        }
      );
    }
  }
  

  goBack(): void {
    this.location.back();
  }
}
