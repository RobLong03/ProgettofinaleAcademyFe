import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private apiUrl = 'http://localhost:9090/app/cartItem/'
    
  constructor(private http: HttpClient) { }

  createCartItem(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  removeCartItem(body : {}){
    return this.http.post(this.apiUrl + "remove", body);
  }

  addCartItem(body : {}){
    return this.http.post(this.apiUrl + "add", body);
  }

  removeItemsCart(body : {}){
    return this.http.post(this.apiUrl + "removeItems", body);
  }

  listByCart(cartId : number){
    return this.http.get(this.apiUrl + "listByCart?id=" + cartId);
  }
}
