import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Interfaces ---

export interface Character {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;
  description: string;
  occupation: string;
  status: string;
  gender: string;
  phrases: string[];
  portrait_path: string;
  first_appearance_ep_id: number | null;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  episode_number: number;
  airdate: string;
  synopsis: string;
  description: string;
  image_path: string;
}

export interface Location {
  id: number;
  name: string;
  town: string;
  use: string;
  description: string;
  image_path: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://thesimpsonsapi.com/api';

  // ¡Aquí está el cambio! Ahora apuntamos al CDN oficial que descubriste
  readonly imageBaseUrl = 'https://cdn.thesimpsonsapi.com';

  constructor(private http: HttpClient) {}

  /** Construye la URL completa de una imagen a partir del path relativo */
  getImageUrl(path: string | null): string {
    if (!path) return '';

    // 1. Detectamos qué sección estamos cargando para usar el tamaño que descubriste
    let carpetaTamano = '500'; // Tamaño por defecto (personajes)
    if (path.includes('episode')) carpetaTamano = '200';
    if (path.includes('location')) carpetaTamano = '1280';

    // 2. Nos aseguramos de que la ruta empiece con "/"
    const pathSeguro = path.startsWith('/') ? path : `/${path}`;

    // 3. Unimos todo: Base CDN + Tamaño + Ruta del archivo
    return `${this.imageBaseUrl}/${carpetaTamano}${pathSeguro}`;
  }

  // --- Personajes ---

  getCharacters(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters?page=${page}&limit=${limit}`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters/${id}`);
  }

  // --- Episodios ---

  getEpisodes(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/episodes?page=${page}&limit=${limit}`);
  }

  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/episodes/${id}`);
  }

  // --- Lugares ---

  getLocations(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/locations?page=${page}&limit=${limit}`);
  }

  getLocationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/locations/${id}`);
  }
}
