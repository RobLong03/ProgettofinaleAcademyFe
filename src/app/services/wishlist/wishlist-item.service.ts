import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistItemService {

  private apiUrl = 'http://localhost:9090/app/product/wishlistItem/'

  constructor(private http : HttpClient) { }

  listWishlistItem(){
   return this.http.get(this.apiUrl + "list");
  }

  getWishlistItem(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  createWishlistItem(body : {}, id : number){
    return this.http.post(this.apiUrl + "create?id=" + id, body);
  }

  deleteWishlistItem(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }
}
