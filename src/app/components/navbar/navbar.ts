import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HlmButton], // <-- Importante para los enlaces
  templateUrl: './navbar.html',
})
export class NavbarComponent {}
