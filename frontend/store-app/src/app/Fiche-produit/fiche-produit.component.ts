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
import { ListeProduitsService } from '../Services/Produits/liste-produits.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private route: ActivatedRoute,
    private listeProduitsService: ListeProduitsService
  ) {}

  @Input() showNavbar: boolean = true;

  @Input() productName: string = '';
  @Input() productDescription: string = '';
  @Input() productDetails: string = '';
  @Input() rating: number = 0;
  @Input() reviewCount: number = 0;
  @Input() productThemes: any[] = [];
  @Input() naturalPercentage: number = 0;
  @Input() duration: string = '';
  @Input() variants: Variant[] = [];
  @Input() price: number = 0;
  @Input() madeInFrance: boolean = false;
  @Input() productImages: ProductImage[] = [];

  displayGallery: boolean = false;
  activeIndex: number = 0;
  responsiveOptions: any[] = [];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const produitId = idParam ? +idParam : null;

    if (produitId !== null) {
      this.listeProduitsService.getProduitById(produitId).subscribe({
        next: (produit) => {

          this.productName = produit.name || '';
          this.productDescription = produit.shortDescription  || '';
          this.productDetails = produit.descriptionLongue || '';
          this.price = produit.price || 0;
          this.variants = produit.variants || [];
          this.productThemes = produit.themes || [];
          this.naturalPercentage = produit.pourcentageNaturel || 0;
          this.duration = produit.duree || '';
          this.madeInFrance = produit.origine === 'France';


          this.productImages = (produit.images || [])
            .filter((img: any) => img.imageData && img.imageMime) // on ne garde que les images valides
            .map((img: any) => {
              return {
                itemImageSrc: `data:${img.imageMime};base64,${img.imageData}`,
                thumbnailImageSrc: `data:${img.imageMime};base64,${img.imageData}`,
                alt: img.imageName || 'Image produit'
              };
            });

          // Si aucune image valide, on affiche une image par défaut
          if (this.productImages.length === 0) {
            this.productImages.push({
              itemImageSrc: 'https://via.placeholder.com/1200x800?text=Pas+d\'image',
              thumbnailImageSrc: 'https://via.placeholder.com/150x100?text=Pas+d\'image',
              alt: 'Aucune image disponible'
            });
          }

        },
        error: (err) => {
          console.error('Erreur lors du chargement du produit à partir de son id ', err);
        }
      });
    }

    this.setupResponsiveOptions();
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
  const selectedVariant = this.getSelectedVariant();


  const productToAdd = {
    name: this.productName,
    price: this.price,
    variant: selectedVariant ? selectedVariant.name : null,
    quantity: 1,
    image: this.productImages.length > 0 ? this.productImages[0].thumbnailImageSrc : '',
    id: this.route.snapshot.paramMap.get('id')
  };

  const existingCart = localStorage.getItem('cart');
  let cart = existingCart ? JSON.parse(existingCart) : [];

  // Si le produit avec la même variante existe déjà dans le panier, on augmente la quantité
  const existingItemIndex = cart.findIndex((item: any) =>
    item.id === productToAdd.id && item.variant === productToAdd.variant
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Produit ajouté au panier :', productToAdd);
}


  getSelectedVariant(): Variant | undefined {
    return this.variants.find(variant => variant.selected);
  }
}
