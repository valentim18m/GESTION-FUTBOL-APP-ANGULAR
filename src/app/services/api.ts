import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de personajes
  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters`);
  }

  // Método opcional para buscar por un ID específico
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters/${id}`);
  }
}
