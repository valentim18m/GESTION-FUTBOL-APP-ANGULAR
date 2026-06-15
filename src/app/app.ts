import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscadorComponent } from "./components/buscador/buscador";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BuscadorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('App-Los-Simpsons');
}
