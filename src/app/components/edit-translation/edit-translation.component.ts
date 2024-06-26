import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-edit-translation',
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.css']
})
export class EditTranslationComponent implements OnInit {
  translation: any = {
    sourceText: '',
    translatedText: '',
    sourceLanguage: '',
    targetLanguage: ''
  };
  id: string | null = null;
  message: string | null = null;

  // Opciones de idiomas disponibles
  languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    // Agrega más idiomas según sea necesario
  ];  

  constructor(
    private location:Location,
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getTranslation(this.id);
    } else {
      console.error('No ID provided in route');
    }
  }

  getTranslation(id: string): void {
    this.translationService.getTranslationById(id).subscribe(
      (data) => {
        this.translation = data;
      },
      (error) => {
        console.error('Error fetching translation', error);
      }
    );
  }

  updateTranslation(): void {
    if (this.id) {
      this.translationService.updateTranslation(this.id, this.translation).subscribe(
        () => {
          this.message = 'Translation updated successfully';
          setTimeout(() => this.router.navigate(['/translations']), 2000);
        },
        (error) => {
          console.error('Error updating translation', error);
          this.message = 'Error updating translation';
        }
      );
    } else {
      console.error('No ID provided for update');
    }
  }

  cancel(): void {
    this.router.navigate(['/translations']);
  }
  goBack(): void {
    this.location.back();
  }
}
