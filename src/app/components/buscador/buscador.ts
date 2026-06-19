import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Api, Character } from '../../services/api';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './buscador.html',
})
export class BuscadorComponent implements OnInit {
  private apiService = inject(Api);
  private cdr = inject(ChangeDetectorRef); // <-- 1. Inyectamos el actualizador visual de Angular

  personajes: Character[] = [];
  personajesFiltrados: Character[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = true;
  error: string | null = null;

  // Paginación
  paginaActual: number = 1;
  totalPersonajes: number = 0;
  limite: number = 20;

  ngOnInit() {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.cargando = true;
    this.error = null;

    this.apiService.getCharacters(this.paginaActual, this.limite).subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res.results) ? res.results : Array.isArray(res) ? res : [];
        this.totalPersonajes = res.count ?? lista.length;
        this.personajes = lista;
        this.filtrarPersonajes();

        this.cargando = false; // Apagamos el estado de carga

        // 2. ¡Magia! Le decimos a Angular explícitamente que redibuje la pantalla
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar personajes:', err);
        this.error = 'No se pudo conectar con Springfield. Intenta de nuevo.';
        this.cargando = false;

        // También redibujamos la pantalla en caso de error para quitar el spinner
        this.cdr.detectChanges();
      },
    });
  }

  filtrarPersonajes() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.personajesFiltrados = [...this.personajes];
    } else {
      this.personajesFiltrados = this.personajes.filter((p) => {
        // Escudo: Si un personaje viene con datos corruptos de internet, lo saltamos
        if (!p || !p.name) return false;
        return p.name.toLowerCase().includes(termino);
      });
    }
  }

  getImagen(personaje: Character): string {
    return this.apiService.getImageUrl(personaje.portrait_path);
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.terminoBusqueda = '';
    this.cargarPersonajes();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.terminoBusqueda = '';
      this.cargarPersonajes();
    }
  }

  get hayMasPaginas(): boolean {
    return this.paginaActual * this.limite < this.totalPersonajes;
  }
}
