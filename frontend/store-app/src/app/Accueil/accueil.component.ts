import { Component } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {}
