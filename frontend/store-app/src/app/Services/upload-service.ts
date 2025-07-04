import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:5248/api/products';

  constructor(private http: HttpClient) {}

  uploadImages(productId: string, files: File[]): Observable<any> {
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    
    return this.http.post(`${this.baseUrl}/${productId}/upload-images`, formData);
  }
  
  getModelById(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productId}/model`);
  }
}
