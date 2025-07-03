import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { UploadService } from '../Services/upload-service';



@Component({
  selector: 'app-creation-produit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    NavbarComponent,
    GalleriaModule,
  ],
  templateUrl: './creation-produit.component.html',
  styleUrls: ['./creation-produit.component.css']
})
export class CreationProduitComponent {
  productForm: FormGroup;
  submitted = false;
  loading = false;
  images: any[] = [];
  selectedFiles: File[] = [];
  activeIndex: number = 0;
  showThumbnails: boolean = true;
  isAutoPlay: boolean = true;
  fullscreen: boolean = false;
  dragging: boolean = false;

  constructor(private fb: FormBuilder, private uploadService: UploadService) {
    // Formulaire avec des noms de champs appropriés
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });

    // Images initialement vides
    this.images = [];
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) return;

    this.loading = true;

    // Ici tu devrais avoir un vrai productId après création produit,
    // ici on simule avec le titre (à remplacer)
    const productId = this.productForm.value.title;

    this.uploadService.uploadImages(productId, this.selectedFiles).subscribe({
      next: (res) => {
        alert('Produit créé et images envoyées avec succès');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur upload', err);
        alert('Erreur lors de l’upload');
        this.loading = false;
      }
    });
  }

  galleriaClass(): string {
    return this.fullscreen ? 'fullscreen' : '';
  }

  onThumbnailButtonClick(): void {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleAutoSlide(): void {
    this.isAutoPlay = !this.isAutoPlay;
  }

  slideButtonIcon(): string {
    return this.isAutoPlay ? 'pi pi-pause' : 'pi pi-play';
  }

  toggleFullScreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  fullScreenIcon(): string {
    return this.fullscreen ? 'pi pi-times' : 'pi pi-external-link';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addImagesFromFileList(input.files);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer?.files) {
      this.addImagesFromFileList(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  addImagesFromFileList(fileList: FileList): void {
    Array.from(fileList).forEach(file => {
      // Vérifier que c'est bien une image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result as string;
          this.images.push({
            itemImageSrc: imageData,
            thumbnailImageSrc: imageData,
            alt: file.name,
            title: file.name
          });

          this.selectedFiles.push(file); // Important pour l'upload
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.selectedFiles.splice(index, 1); // Supprimer aussi le fichier sélectionné
    if (this.activeIndex >= this.images.length) {
      this.activeIndex = Math.max(0, this.images.length - 1);
    }
  }
}
