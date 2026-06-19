import { Component, OnInit, inject } from '@angular/core';
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
        const lista = res.data ?? res;
        this.totalLugares = res.total ?? lista.length;
        this.lugares = lista;
        this.filtrarLugares();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar lugares:', err);
        this.error = 'No se pudo cargar el mapa de Springfield.';
        this.cargando = false;
      },
    });
  }

  filtrarLugares() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.lugaresFiltrados = [...this.lugares];
    } else {
      this.lugaresFiltrados = this.lugares.filter(
        (l) =>
          l.name.toLowerCase().includes(termino) ||
          l.use?.toLowerCase().includes(termino)
      );
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
