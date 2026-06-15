import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
})
export class BuscadorComponent implements OnInit {
  // Inyectamos el servicio
  private apiService = inject(Api);

  // Variables para guardar los datos
  personajes: any[] = [];
  personajesFiltrados: any[] = [];
  terminoBusqueda: string = '';

  ngOnInit() {
    // Consumimos la API al iniciar el componente
    this.apiService.getCharacters().subscribe({
      next: (res: any) => {
        // Guardamos los datos originales y la copia para filtrar
        this.personajes = res.data || res;
        this.personajesFiltrados = this.personajes;
      },
      error: (err) => console.error('Error al cargar la API', err),
    });
  }

  // Función que se ejecuta cada vez que el usuario escribe en el buscador
  filtrarPersonajes() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.personajesFiltrados = this.personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(termino),
    );
  }
}
