import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../Navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ListeProduitsService, Produit } from '../Services/Produits/liste-produits.service';
import { Router } from '@angular/router';

interface Photo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  date: string;
  produitOriginal: Produit;
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
    TooltipModule
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  produits: Produit[] = [];
  photos: Photo[] = [];
  displayCustom = false;
  activeIndex = 0;
  responsiveOptions: any[] = [];


  constructor(private listeProduitsService: ListeProduitsService,private router: Router) {}

  ngOnInit(): void {
    this.setupResponsiveOptions();
    this.initializeProduits();
  }

  initializeProduits(): void {
    this.listeProduitsService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
        this.transformProduitsEnPhotos(produits);
      },
      error: (err) => {
        console.error("Erreur lors du chargement des produits :", err);
      }
    });
  }

  transformProduitsEnPhotos(produits: Produit[]): void {
    this.photos = produits.map(produit => {


      let imageUrl = 'https://via.placeholder.com/1200x800?text=Pas+d\'image';
      
      if (produit.images && produit.images.length > 0) {
        const firstImage = produit.images[0];
        

        if ((firstImage as any).imageData && (firstImage as any).imageMime) {
          imageUrl = `data:${(firstImage as any).imageMime};base64,${(firstImage as any).imageData}`;
        }

        else if (typeof firstImage === 'string') {
          imageUrl = `data:image/png;base64,${firstImage}`;
        }
      }

      const categoryName = (produit as any).productThemes && (produit as any).productThemes.length > 0
        ? (produit as any).productThemes[0].theme.name
        : 'Inconnu';

      return {
        itemImageSrc: imageUrl,
        thumbnailImageSrc: imageUrl,
        alt: (produit as any).name || produit.title, 
        title: (produit as any).name || produit.title,
        description: (produit as any).shortDescription || produit.petiteDescription,
        category: categoryName,
        date: new Date().toISOString(),
        produitOriginal: produit
      };
    });
  }

  goToFicheProduit(id: number) {
    this.router.navigate(['/fiche-produit', id]);
  }


  visualiserProduit(index: number): void {
    const produitId = this.produits[index]?.id || 0;
    this.goToFicheProduit(produitId);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCategoryColor(category: string): string {
    const categoryMap: Record<string, string> = {
      'Nature': 'success',
      'Plage': 'info',
      'Urbain': 'warning',
      'Inconnu': 'secondary',
      'default': 'help'
    };
    return categoryMap[category] || 'contrast';
  }

  setupResponsiveOptions(): void {
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 5 },
      { breakpoint: '768px', numVisible: 3 },
      { breakpoint: '560px', numVisible: 1 }
    ];
  }
}