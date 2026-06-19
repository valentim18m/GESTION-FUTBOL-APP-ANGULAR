import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef); // <-- 1. Inyectamos el actualizador visual

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
          this.cdr.detectChanges(); // <-- 2. Le decimos a Angular que redibuje la pantalla con los datos
        },
        error: (err) => {
          console.error('Error al cargar el personaje:', err);
          this.error = 'No pudimos encontrar a ese ciudadano de Springfield.';
          this.cargando = false;
          this.cdr.detectChanges(); // <-- También redibujamos en caso de error para quitar el spinner
        },
      });
    }
  }

  getImagen(): string {
    return this.apiService.getImageUrl(this.personaje?.portrait_path ?? null);
  }
}
