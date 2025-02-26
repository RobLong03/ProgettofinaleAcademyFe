import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:9090/app/admin/order/'
      
  constructor(private http: HttpClient) { }

  getOrder(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listOrder(){
    return this.http.get(this.apiUrl + "list");
  }

  listByCustomer(id : number){
    return this.http.get(this.apiUrl + "listByCustomer?id=" + id);
  }

  createOrder(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateOrder(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

updateOrderStatus(body : {}){
    return this.http.post(this.apiUrl + "updateStatus", body);
}

  deleteOrder(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }
}
