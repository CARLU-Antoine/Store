import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchQuery: string = '';

  categories = [
    { id: 1, name: "Catégorie 1" },
    { id: 2, name: "Catégorie 2" },
    { id: 3, name: "Catégorie 3" },
    { id: 4, name: "Catégorie 4" },
  ];

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']);
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPanier() {
    this.router.navigate(['/panier']);
  }

  onSearch(): void {
    console.log('Recherche :', this.searchQuery);
  }
}
