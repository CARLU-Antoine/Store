import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Produit {
  id?: number; 
  title: string;
  price: number;
  petiteDescription: string;
  themes: { name: string }[];
  description: string;
  images: File[];
}


@Injectable({
  providedIn: 'root'
})
export class ListeProduitsService {

  private apiUrl = 'http://localhost:5248/api/products';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getProduitById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
