import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para traducir texto
  translateText(text: string, sourceLang: string, targetLang: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/translate`, { text, sourceLang, targetLang })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para obtener todas las traducciones
  getAllTranslations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/traducciones`)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para obtener una traducción por ID
  getTranslationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/traducciones/${id}`)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para crear una nueva traducción
  createTranslation(sourceText: string, translatedText: string, sourceLanguage: string, targetLanguage: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/traducciones`, { sourceText, translatedText, sourceLanguage, targetLanguage })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para actualizar una traducción existente por su ID
  updateTranslation(id: string, translation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/traducciones/${id}`, translation)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para eliminar una traducción por su ID
  deleteTranslation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/traducciones/${id}`)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para manejar errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log del error en la consola
    return throwError(errorMessage); // Propagar el error hacia el componente
  }
}
