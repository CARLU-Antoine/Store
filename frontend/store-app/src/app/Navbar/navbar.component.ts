import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  searchQuery: string = '';
  sidebarVisible: boolean = false;

  articlesPanier: any[] = [];
  totalPanier: number = 0;

  categories = [
    { id: 1, name: "Catégorie 1" },
    { id: 2, name: "Catégorie 2" },
    { id: 3, name: "Catégorie 3" },
    { id: 4, name: "Catégorie 4" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.chargerPanierDepuisLocalStorage();
  }

  chargerPanierDepuisLocalStorage(): void {
    const cart = localStorage.getItem('cart');
    this.articlesPanier = cart ? JSON.parse(cart) : [];
    this.calculerTotalPanier();
  }

  calculerTotalPanier(): void {
    this.totalPanier = this.articlesPanier.reduce(
      (total, article) => total + (article.price * (article.quantity ?? 1)),
      0
    );
  }

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

  supprimerArticlePanier(id: number, variant?: string): void {
    this.articlesPanier = this.articlesPanier.filter(article => {
      // Si variant est défini, on compare id ET variant
      if (variant !== undefined) {
        return !(article.id === id && article.variant === variant);
      }
      // Sinon on compare seulement l'id
      return article.id !== id;
    });
    this.mettreAJourLocalStorage();
  }

  modifierQuantite(id: number, event: Event, variant?: string): void {
    const input = event.target as HTMLInputElement;
    let nouvelleQuantite = Number(input.value);
    if (isNaN(nouvelleQuantite) || nouvelleQuantite < 1) {
      nouvelleQuantite = 1; // Minimum 1
      input.value = '1';
    }

    const article = this.articlesPanier.find(a => {
      if (variant !== undefined) {
        return a.id === id && a.variant === variant;
      }
      return a.id === id;
    });

    if (article) {
      article.quantity = nouvelleQuantite;
      this.mettreAJourLocalStorage();
    }
  }

  mettreAJourLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.articlesPanier));
    this.calculerTotalPanier();
  }

  validerPanier(): void { 
    console.log('Panier validé avec succès !');
    localStorage.removeItem('cart');
    this.articlesPanier = [];
    this.totalPanier = 0;
  }
}
