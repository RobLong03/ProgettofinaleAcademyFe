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

  deleteCart(id : number){
    return this.http.get(this.apiUrl + "delete?id=" + id);
  }

  clearCart(body : {}){
    return this.http.post(this.apiUrl + "clear", body);
  }
}
