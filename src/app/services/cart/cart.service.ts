import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:9090/app/cart/'
    
  constructor(private http: HttpClient) { }

  createCart(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  deleteCart(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }

  clearCart(body : {}){
    return this.http.post(this.apiUrl + "clear", body);
  }

  getCart(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }
}
