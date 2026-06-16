import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// import { ApiService } from '../../services/api.service'; // Comentado temporalmente

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './buscador.html',
})
export class BuscadorComponent {
  // private apiService = inject(ApiService); // Comentado temporalmente

  // 1. Agregamos los personajes manualmente (Mock Data)
  personajes: any[] = [
    {
      id: 1,
      name: 'Homer Simpson',
      occupation: 'Inspector de Seguridad',
      image:
        'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939',
    },
    {
      id: 2,
      name: 'Marge Simpson',
      occupation: 'Ama de casa',
      image:
        'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205',
    },
    {
      id: 3,
      name: 'Bart Simpson',
      occupation: 'Estudiante',
      image:
        'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638',
    },
    {
      id: 4,
      name: 'Lisa Simpson',
      occupation: 'Estudiante y Saxofonista',
      image:
        'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083',
    },
  ];

  // 2. Inicializamos la lista filtrada con los mismos datos
  personajesFiltrados: any[] = [...this.personajes];
  terminoBusqueda: string = '';




  filtrarPersonajes() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.personajesFiltrados = this.personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(termino),
    );
  }
}
