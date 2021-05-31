import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageSnippet } from '../helpers/image-snippet';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = '/uploadImage';
  }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    console.warn(formData.get('image'));
    return this.http.post(environment.baseURL + this.apiUrl, formData);
  }
}
