import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  email: string;
  motDePasse: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreationUtilisateurService {

  private apiUrl = 'http://localhost:5248/api/users/creerUtilisateur';

  constructor(private http: HttpClient) { }

  creerUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.post(this.apiUrl, utilisateur);
  }
}
