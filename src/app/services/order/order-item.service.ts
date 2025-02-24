import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private apiUrl = 'http://localhost:9090/app/admin/order/items/'
        
  constructor(private http: HttpClient) { }

  listByOrder(id : number){
    return this.http.get(this.apiUrl + "listByOrder?id=" + id);
  }

  getOrderItem(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  addItemToOrder(body : {}){
    return this.http.post(this.apiUrl + "addItemToOrder", body);
  }

  removeItemFromOrder(body : {}){
    return this.http.post(this.apiUrl + "removeItemFromOrder", body);
  }

  deleteOrderItme(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }
}