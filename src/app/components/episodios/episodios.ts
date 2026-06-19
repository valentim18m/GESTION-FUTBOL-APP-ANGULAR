import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, Episode } from '../../services/api';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './episodios.html',
  styleUrl: './episodios.css',
})
export class EpisodiosComponent implements OnInit {
  private apiService = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  episodios: Episode[] = [];
  episodiosFiltrados: Episode[] = [];
  temporadaSeleccionada: number | null = null;
  cargando: boolean = true;
  error: string | null = null;

  // Paginación
  paginaActual: number = 1;
  totalEpisodios: number = 0;
  limite: number = 20;

  ngOnInit() {
    this.cargarEpisodios();
  }

  cargarEpisodios() {
    this.cargando = true;
    this.error = null;

    this.apiService.getEpisodes(this.paginaActual, this.limite).subscribe({
      next: (res: any) => {
        // La API devuelve { count, next, prev, pages, results: [...] }
        const lista = Array.isArray(res.results) ? res.results : Array.isArray(res) ? res : [];
        this.totalEpisodios = res.count ?? lista.length;
        this.episodios = lista;

        this.filtrarEpisodios();

        // Apagamos el spinner
        this.cargando = false;
        // ¡Despertamos a Angular para que muestre las tarjetas!
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar episodios:', err);
        this.error = 'No se pudo conectar con la guía de episodios.';
        this.cargando = false;
        // También redibujamos la pantalla en caso de error
        this.cdr.detectChanges();
      },
    });
  }

  filtrarEpisodios() {
    if (this.temporadaSeleccionada === null) {
      this.episodiosFiltrados = [...this.episodios];
    } else {
      this.episodiosFiltrados = this.episodios.filter((e) => {
        // ESCUDO: Protegemos el código por si un episodio viene vacío o corrupto
        if (!e || typeof e.season === 'undefined') return false;
        return e.season === this.temporadaSeleccionada;
      });
    }
  }

  seleccionarTemporada(temporada: number | null) {
    this.temporadaSeleccionada = temporada;
    this.filtrarEpisodios();
  }

  getImagen(ep: Episode): string {
    return this.apiService.getImageUrl(ep.image_path);
  }

  get temporadas(): number[] {
    // ESCUDO: Evitamos que se rompa el menú si un episodio no tiene temporada asignada
    const episodiosValidos = this.episodios.filter((e) => e && typeof e.season !== 'undefined');
    const unicos = [...new Set(episodiosValidos.map((e) => e.season))];
    return unicos.sort((a, b) => a - b);
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.temporadaSeleccionada = null;
    this.cargarEpisodios();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.temporadaSeleccionada = null;
      this.cargarEpisodios();
    }
  }

  get hayMasPaginas(): boolean {
    return this.paginaActual * this.limite < this.totalEpisodios;
  }
}
