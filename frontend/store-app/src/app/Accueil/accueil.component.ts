import { Component } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavbarComponent,
    CarouselModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  products = [
    {
      name: 'Product 1',
      image: 'product1.png',
      price: 100,
      inventoryStatus: 'INSTOCK'
    },
    {
      name: 'Product 2',
      image: 'product2.png',
      price: 150,
      inventoryStatus: 'LOWSTOCK'
    },
    // ajoute d’autres produits ici...
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  getSeverity(status: string): string {
    switch(status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}
