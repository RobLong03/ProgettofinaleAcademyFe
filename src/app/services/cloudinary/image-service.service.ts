import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  
  private cloudName = "djajkgk0k";
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`

  constructor(private http: HttpClient) { }

  caricaImmagine(formData:FormData){
    return this.http.post<any>(this.cloudinaryUrl, formData);
  }

}
