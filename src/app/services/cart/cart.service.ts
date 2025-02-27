import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCart(customerId : number){
    let param = new HttpParams().set('customerId', customerId);
    return this.http.get(this.apiUrl + "get", {params: param});
  }
}
