import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { fadeInOut } from '../../animations/animations';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
  animations: [fadeInOut]
})
export class TranslatorComponent {
  translationMode: 'text' | 'voice' = 'text';
  sourceLanguage: string = 'en';
  targetLanguage: string = 'es';
  textToTranslate: string = '';
  translatedText: string = '';
  recording: boolean = false;
  listening: boolean = false; // Indicador de si está escuchando
  countdown: number = 0; // Contador para la cuenta regresiva
  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ko', name: 'Korean' }
    // Agrega más idiomas según sea necesario
  ];

  constructor(
    private location: Location,
    private translationService: TranslationService,
    private speechRecognitionService: SpeechRecognitionService
  ) { }

  // Método para cambiar el modo de traducción
  setTranslationMode(mode: 'text' | 'voice'): void {
    this.translationMode = mode;
  }

  // Método para intercambiar los idiomas de origen y destino
  swapLanguages(): void {
    const tempLanguage = this.sourceLanguage;
    this.sourceLanguage = this.targetLanguage;
    this.targetLanguage = tempLanguage;
  }

  // Método para traducir el texto ingresado
  translate(): void {
    if (this.textToTranslate.trim() !== '') {
      this.translationService.translateText(this.textToTranslate, this.sourceLanguage, this.targetLanguage).subscribe(
        (response) => {
          this.translatedText = response.translatedText;
        },
        (error) => {
          console.error('Error translating text:', error);
        }
      );
    }
  }

  // Método para iniciar la cuenta regresiva y luego la grabación y reconocimiento de voz
  startCountdownAndRecording(): void {
    this.countdown = 3; // Contador inicial (por ejemplo, 3 segundos)
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.startRecording(); // Iniciar la grabación después de la cuenta regresiva
      }
    }, 1000); // Disminuir el contador cada segundo
  }

  // Método para iniciar la grabación y reconocimiento de voz
  private startRecording(): void {
    this.listening = true; // Indicar que se está escuchando
    this.recording = true;
    this.speechRecognitionService.startListening(this.sourceLanguage).subscribe(
      (result: string) => {
        this.textToTranslate = result;
        this.recording = false;
        this.listening = false; // Indicar que ha dejado de escuchar
        this.translate(); // Llamar a la función de traducción después de obtener el texto
      },
      (error) => {
        console.error('Error during voice recognition:', error);
        this.recording = false;
        this.listening = false; // Indicar que ha dejado de escuchar
      }
    );
  }

  // Método para detener la grabación y reconocimiento de voz
  stopRecording(): void {
    this.recording = false;
    this.speechRecognitionService.stopListening();
    this.listening = false; // Asegurarse de que no se está escuchando al parar la grabación
  }

  // Método para limpiar los textos de entrada y salida
  clearText(): void {
    this.textToTranslate = '';
    this.translatedText = '';
  }

  // Método para volver a la página anterior
  goBack(): void {
    this.location.back();
  }
}
