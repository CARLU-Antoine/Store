import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../Navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

interface ProductImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
}

interface Variant {
  name: string;
  color: string;
  selected: boolean;
}

@Component({
  selector: 'app-fiche-produit',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    GalleriaModule,
    ImageModule,
    ButtonModule,
    CardModule,
    TagModule,
    RippleModule,
    TooltipModule,
    RatingModule,
    FormsModule,
    DividerModule
  ],
  templateUrl: './fiche-produit.component.html',
  styleUrls: ['./fiche-produit.component.css']
})
export class FicheProduitComponent implements OnInit {
  @Input() showNavbar: boolean = true;

  @Input() productName: string = "Shampoing solide doux Lait d'Amande";
  @Input() productDescription: string = "Mousse onctueuse, cheveux doux et brillants";
  @Input() productDetails: string = "Un shampoing solide pour des cheveux doux et brillants grâce à une formule onctueuse, enrichie en huiles végétales.";

  @Input() rating: number = 5;
  @Input() reviewCount: number = 2839;

  @Input() productThemes: any[] = [];
  
  @Input() naturalPercentage: number = 94;
  @Input() duration: string = "2 mois (75g)";

  @Input() variants: Variant[] = [
    { name: 'FLEUR DE COTON', color: '#87CEEB', selected: false },
    { name: 'LAIT D\'AMANDE', color: '#90EE90', selected: true }
  ];

  @Input() price: number = 10.90;
  @Input() madeInFrance: boolean = true;



  @Input() productImages: ProductImage[] = [];

  displayGallery: boolean = false;
  activeIndex: number = 0;
  responsiveOptions: any[] = [];

  ngOnInit() {
    if (this.productImages.length === 0) {
      this.initializeProductImages();
    }
    this.setupResponsiveOptions();
  }

  initializeProductImages() {
    this.productImages = [
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=1000&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=150&h=150&fit=crop',
        alt: 'Shampoing solide principal'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
        alt: 'Vue détaillée du produit'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=1000&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=150&h=150&fit=crop',
        alt: 'Produit en utilisation'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&h=150&fit=crop',
        alt: 'Emballage du produit'
      }
    ];
  }

  setupResponsiveOptions() {
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 4 },
      { breakpoint: '768px', numVisible: 3 },
      { breakpoint: '560px', numVisible: 2 }
    ];
  }

  openGallery(index: number) {
    this.activeIndex = index;
    this.displayGallery = true;
  }

  selectVariant(variantName: string) {
    this.variants.forEach(variant => {
      variant.selected = variant.name === variantName;
    });
  }

  addToCart() {
    console.log('Produit ajouté au panier');
    // Ajouter ta logique d'ajout au panier ici
  }

  getSelectedVariant(): Variant | undefined {
    return this.variants.find(variant => variant.selected);
  }
}
