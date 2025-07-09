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

export class ConnexionUtilisateurService {

  private apiUrl = 'http://localhost:5248/api/users/connexionUtilisateur';

  constructor(private http: HttpClient) { }
  
    connexionUtilisateur(utilisateur: Utilisateur): Observable<any> {

      return this.http.post(this.apiUrl, utilisateur);
    }

}
