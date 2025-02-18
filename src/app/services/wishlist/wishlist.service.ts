import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = 'http://localhost:9090/app/product/wishlist/'

  constructor(private http : HttpClient) { }

  listWishlist(){
    return this.http.get(this.apiUrl + "list");
  }

  getWishlist(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  emptyWishlist(id : number){
    return this.http.post(this.apiUrl + "emptyWishlist", id);
  }
}
