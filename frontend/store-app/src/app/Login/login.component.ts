import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

import { NavbarComponent } from '../Navbar/navbar.component';
import { CreationUtilisateurService } from '../Services/User/creation-utilisateur.service';
import { ConnexionUtilisateurService } from '../Services/User/connexion-utilisateur.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    TabMenuModule,
    NavbarComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  loading = false;

  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  activeIndex = 0;

  constructor(
    private fb: FormBuilder,
    private connexionService: ConnexionUtilisateurService,
    private creationService: CreationUtilisateurService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Connexion' },
      { label: 'Créer un compte' }
    ];
    this.activeItem = this.items[this.activeIndex];
  }

  get f() {
    return this.loginForm.controls;
  }

  get rf() {
    return this.registerForm.controls;
  }

  onTabChange(event: MenuItem) {
    this.activeItem = event;
    this.activeIndex = this.items.indexOf(event);
    this.submitted = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  connexion() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.connexionService.connexionUtilisateur({ email, motDePasse: password }).subscribe({
      next: (res: any) => {
        alert(`Connexion réussie : ${email}`);
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la connexion");
        this.loading = false;
      }
    });
  }

  creer() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const { email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    this.loading = true;
    this.creationService.creerUtilisateur({ email, motDePasse: password }).subscribe({
      next: (res) => {
        alert(`Compte créé pour : ${email}`);
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert("Erreur lors de la création du compte");
        this.loading = false;
      }
    });
  }
}
