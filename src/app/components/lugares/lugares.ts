import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, Location } from '../../services/api';

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lugares.html',
  styleUrl: './lugares.css',
})
export class LugaresComponent implements OnInit {
  private apiService = inject(Api);
  private cdr = inject(ChangeDetectorRef); // <-- 1. Inyectamos el actualizador visual

  lugares: Location[] = [];
  lugaresFiltrados: Location[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = true;
  error: string | null = null;

  // Paginación
  paginaActual: number = 1;
  totalLugares: number = 0;
  limite: number = 20;

  ngOnInit() {
    this.cargarLugares();
  }

  cargarLugares() {
    this.cargando = true;
    this.error = null;

    this.apiService.getLocations(this.paginaActual, this.limite).subscribe({
      next: (res: any) => {
        // La API devuelve { count, next, prev, pages, results: [...] }
        const lista = Array.isArray(res.results) ? res.results : Array.isArray(res) ? res : [];
        this.totalLugares = res.count ?? lista.length;
        this.lugares = lista;

        this.filtrarLugares();

        this.cargando = false;
        this.cdr.detectChanges(); // <-- 2. Despertamos a Angular para que pinte las tarjetas
      },
      error: (err) => {
        console.error('Error al cargar lugares:', err);
        this.error = 'No se pudo cargar el mapa de Springfield.';
        this.cargando = false;
        this.cdr.detectChanges(); // <-- También redibujamos si falla
      },
    });
  }

  filtrarLugares() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.lugaresFiltrados = [...this.lugares];
    } else {
      this.lugaresFiltrados = this.lugares.filter((l) => {
        // ESCUDO: Protegemos el código por si un lugar viene vacío o sin nombre
        if (!l || !l.name) return false;

        // Comprobamos el nombre y también el uso (si es que la API mandó el uso)
        const coincideNombre = l.name.toLowerCase().includes(termino);
        const coincideUso = l.use ? l.use.toLowerCase().includes(termino) : false;

        return coincideNombre || coincideUso;
      });
    }
  }

  getImagen(lugar: Location): string {
    return this.apiService.getImageUrl(lugar.image_path);
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.terminoBusqueda = '';
    this.cargarLugares();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.terminoBusqueda = '';
      this.cargarLugares();
    }
  }

  get hayMasPaginas(): boolean {
    return this.paginaActual * this.limite < this.totalLugares;
  }
}
