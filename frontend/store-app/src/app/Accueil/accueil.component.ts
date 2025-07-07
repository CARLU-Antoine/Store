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

interface Photo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-fiche-produit',
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
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  photos: Photo[] = [];
  displayCustom: boolean = false;
  activeIndex: number = 0;
  responsiveOptions: any[] = [];

  ngOnInit() {
    this.initializePhotos();
    this.setupResponsiveOptions();
  }

  initializePhotos() {
    this.photos = [
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        alt: 'Montagne au coucher du soleil',
        title: 'Coucher de soleil en montagne',
        description: 'Une vue magnifique sur les montagnes au coucher du soleil',
        category: 'Nature',
        date: '2024-01-15'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop',
        alt: 'Lac paisible',
        title: 'Lac de montagne',
        description: 'Un lac crystal clair entouré de forêts verdoyantes',
        category: 'Nature',
        date: '2024-01-20'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
        alt: 'Forêt dense',
        title: 'Forêt mystérieuse',
        description: 'Une forêt dense avec des rayons de soleil filtrant',
        category: 'Nature',
        date: '2024-02-01'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
        alt: 'Plage tropicale',
        title: 'Plage paradisiaque',
        description: 'Une plage de sable blanc avec des eaux turquoise',
        category: 'Plage',
        date: '2024-02-10'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        alt: 'Ville la nuit',
        title: 'Skyline urbain',
        description: 'Les lumières de la ville scintillent dans la nuit',
        category: 'Urbain',
        date: '2024-02-15'
      },
      {
        itemImageSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop',
        thumbnailImageSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop',
        alt: 'Champ de fleurs',
        title: 'Prairie fleurie',
        description: 'Un champ coloré de fleurs sauvages au printemps',
        category: 'Nature',
        date: '2024-03-01'
      }
    ];
  }

  setupResponsiveOptions() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  openGallery(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'Nature':
        return 'success';
      case 'Plage':
        return 'info';
      case 'Urbain':
        return 'warning';
      default:
        return 'primary';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
