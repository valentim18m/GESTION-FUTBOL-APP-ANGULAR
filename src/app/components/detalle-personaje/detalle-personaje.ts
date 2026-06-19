import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-personaje.html',
})
export class DetallePersonajeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(Api);

  personaje: any = null;
  cargando: boolean = true;

  // Arreglo de respaldo con URLs públicas y estables
  personajesMock: any[] = [
    {
      id: 1,
      name: 'Homero Simpson',
      occupation: 'Inspector de Seguridad',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png',
      status: 'Vivo',
      gender: 'Masculino',
    },
    {
      id: 2,
      name: 'Marge Simpson',
      occupation: 'Ama de casa',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png',
      status: 'Vivo',
      gender: 'Femenino',
    },
    {
      id: 3,
      name: 'Bart Simpson',
      occupation: 'Estudiante',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png',
      status: 'Vivo',
      gender: 'Masculino',
    },
    {
      id: 4,
      name: 'Lisa Simpson',
      occupation: 'Estudiante y Saxofonista',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png',
      status: 'Vivo',
      gender: 'Femenino',
    },
  ];

  ngOnInit() {
    // Capturamos el ID dinámico de la URL (/personaje/:id)
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam; // Convertimos el string a número

      // 1. Buscamos PRIMERO en tus datos locales
      const personajeLocal = this.personajesMock.find((p) => p.id === id);

      if (personajeLocal) {
        // Si es la familia principal, usamos tus datos traducidos y tus imágenes
        this.personaje = personajeLocal;
        this.cargando = false;
      } else {
        // 2. Si NO está en tu lista local, lo buscamos en la API
        this.apiService.getCharacterById(id).subscribe({
          next: (res: any) => {
            this.personaje = res.data || res;
            this.cargando = false;
          },
          error: (err) => {
            console.warn('Error al cargar desde la API.', err);
            this.personaje = null;
            this.cargando = false;
          },
        });
      }
    }
  }
}
