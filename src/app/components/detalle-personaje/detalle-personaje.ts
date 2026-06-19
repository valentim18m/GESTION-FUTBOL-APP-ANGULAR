import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api, Character } from '../../services/api';

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-personaje.html',
})
export class DetallePersonajeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(Api);

  personaje: Character | null = null;
  cargando: boolean = true;
  error: string | null = null;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam;
      this.apiService.getCharacterById(id).subscribe({
        next: (res: any) => {
          // La API puede devolver { data: {...} } o el objeto directamente
          this.personaje = res.data ?? res;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar el personaje:', err);
          this.error = 'No pudimos encontrar a ese ciudadano de Springfield.';
          this.cargando = false;
        },
      });
    }
  }

  getImagen(): string {
    return this.apiService.getImageUrl(this.personaje?.portrait_path ?? null);
  }
}
