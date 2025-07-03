import { Routes } from '@angular/router';
import { AccueilComponent } from './Accueil/accueil.component';
import { LoginComponent } from './Login/login.component';


export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'home', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
];
