import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // <-- Importante para los enlaces
  templateUrl: './navbar.html',
})
export class NavbarComponent { }
