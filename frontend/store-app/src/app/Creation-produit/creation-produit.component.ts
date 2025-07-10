import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { FicheProduitComponent } from '../Fiche-produit/fiche-produit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CreationProduitService } from '../Services/Produits/creation-produit.service';

@Component({
  selector: 'app-creation-produit',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    NavbarComponent,
    GalleriaModule,
    FicheProduitComponent,
    MultiSelectModule
  ],
  templateUrl: './creation-produit.component.html',
  styleUrls: ['./creation-produit.component.css']
})
export class CreationProduitComponent {
  productForm: FormGroup;
  submitted = false;
  loading = false;


  images: { itemImageSrc: string; thumbnailImageSrc: string; alt: string; title: string; }[] = [];
  selectedFiles: File[] = [];
  activeIndex = 0;
  showThumbnails = true;
  isAutoPlay = true;
  fullscreen = false;
  dragging = false;
  showNavbar = false;


  themeSelected: any[] = [];
  themes = [
    { name: 'Science' },
    { name: 'Histoire' },
    { name: 'Technologie' },
  ];

  visible = false;

  productName: string | undefined;
  price: number | undefined;
  productDescription: string | undefined;
  productDetails: string | undefined;

  constructor(private fb: FormBuilder,private creationProduitService: CreationProduitService) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      petiteDescription: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      themes: [[]],
    });

    this.productForm.valueChanges.subscribe(values => {
      this.productName = values.title;
      this.price = values.price;
      this.productDescription = values.petiteDescription;
      this.productDetails = values.description;
      this.themeSelected = values.themes || [];
    });
  }

  get f() {
    return this.productForm.controls;
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
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result as string;


          this.images = [...this.images, {
            itemImageSrc: imageData,
            thumbnailImageSrc: imageData,
            alt: file.name,
            title: file.name
          }];
          this.selectedFiles = [...this.selectedFiles, file];
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number): void {
    this.images = this.images.filter((_, i) => i !== index);
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    if (this.activeIndex >= this.images.length) {
      this.activeIndex = Math.max(0, this.images.length - 1);
    }
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  creerNouveauTheme(){

    const inputNouveauTheme = document.getElementById('nouveau-theme') as HTMLInputElement;

    if(inputNouveauTheme.value.trim() != '') {
      this.themes.push({ name: inputNouveauTheme.value });

      inputNouveauTheme.value = '';
      this.visible = false;
    }

  }

  creerProduit() {
    console.log("Création du produit...");

    this.submitted = true;

    console.log("Formulaire soumis :", this.productForm.value);

    if (this.productForm.invalid) return;

    this.loading = true;

    const { title, price, petiteDescription, description, themes } = this.productForm.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price.toString());
    formData.append('petiteDescription', petiteDescription);
    formData.append('description', description);
    formData.append('themes', JSON.stringify(themes));

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    this.creationProduitService.creerProduit(formData).subscribe({
      next: (res: any) => {
        alert(`Produit créé avec succès : ${title}`);
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la création du produit");
        this.loading = false;
      }
    });
  }

}
