import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SidebarModule,
    CardModule,
    InputTextModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchQuery: string = '';
  sidebarVisible: boolean = false;

  articlesPanier = [
    { id: 1, photoSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop',name: "Article",quantite:1, price: 10.99 },
  ];

  totalPanier: number = this.articlesPanier.reduce((total, article) => total + article.price, 0);

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

  goToCreation() {
    this.router.navigate(['/creation-produit']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    console.log('Recherche :', this.searchQuery);
  }

  supprimerArticlePanier(id: number): void {
    this.articlesPanier = this.articlesPanier.filter(article => article.id !== id);
  }

  validerPanier(): void { 
    console.log('Panier validé avec succès !');
    this.articlesPanier = [];
    this.totalPanier = 0;
  }
}
