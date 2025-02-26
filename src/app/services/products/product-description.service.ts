import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDescriptionService {

  private apiUrl = 'http://localhost:9090/app/product-description/'

    constructor(private http: HttpClient) { }

    getDescription(id : number,lang?:string){
      if (lang) {
        return this.http.get(this.apiUrl + "get-by-product?id_prodotto=" + id+"?lang="+lang);
      }
      return this.http.get(this.apiUrl + "get-by-product?id_prodotto=" +id);
    }

    getDescriptionById(id : number){
      return this.http.get(this.apiUrl + "get?id=" + id);
    }

    createDescription(body : {}){
      return this.http.post(this.apiUrl + "create", body);
    }

    updateDescription(body : {}){
      return this.http.post(this.apiUrl + "update", body);
    }

    deleteDescription(body : {}){
      return this.http.post(this.apiUrl + "delete", body);
    }
    deleteAllDescription(body : {}){
      return this.http.post(this.apiUrl + "deleteAll", body);
    }
}
