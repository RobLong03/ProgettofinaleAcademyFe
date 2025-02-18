import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9090/app/product/'

  constructor(private http: HttpClient) { }

  getProduct(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listProduct(){
    return this.http.get(this.apiUrl + "list");
  }

  createProduct(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateProduct(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

  deleteProduct(id : number){
    return this.http.get(this.apiUrl + "delete?id=" + id);
  }
}
