import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { BuscadorComponent } from './components/buscador/buscador';
import { DetallePersonajeComponent } from './components/detalle-personaje/detalle-personaje';
import { EpisodiosComponent } from './components/episodios/episodios';
import { LugaresComponent } from './components/lugares/lugares';

export const routes: Routes = [
  { path: '', component: InicioComponent }, // Ruta de inicio (Landing Page)
  { path: 'personajes', component: BuscadorComponent }, // <-- ¡RUTA CORREGIDA!
  { path: 'personaje/:id', component: DetallePersonajeComponent }, // Detalle
  { path: 'episodios', component: EpisodiosComponent }, // Episodios
  { path: 'lugares', component: LugaresComponent }, // Lugares
  { path: '**', redirectTo: '' }, // Redirección de seguridad
];
