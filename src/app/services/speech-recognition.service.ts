import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private recognitionSubject: Subject<string>;

  constructor() {
    const { webkitSpeechRecognition, SpeechRecognition } = (window as any);
    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();
    } else if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    } else {
      throw new Error('Speech recognition not supported in this browser.');
    }

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognitionSubject = new Subject<string>();
  }

  startListening(language: string): Observable<string> {
    this.recognition.lang = this.getLanguageCode(language);
    this.recognitionSubject = new Subject<string>();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.recognitionSubject.next(transcript);
      this.recognition.stop(); // Detener el reconocimiento después de obtener el resultado
    };

    this.recognition.onerror = (event: any) => {
      this.recognitionSubject.error(event.error);
      this.recognition.stop(); // Asegurarse de detener el reconocimiento en caso de error
    };

    this.recognition.onend = () => {
      this.recognitionSubject.complete();
    };

    this.recognition.start();
    return this.recognitionSubject.asObservable();
  }

  stopListening(): void {
    this.recognition.stop();
  }

  private getLanguageCode(language: string): string {
    const languageMap: { [key: string]: string } = {
      'english': 'en-US',
      'spanish': 'es-ES',
      'french': 'fr-FR',
      'korean': 'ko-KR'
    };
    return languageMap[language.toLowerCase()] || 'en-US';
  }
}
