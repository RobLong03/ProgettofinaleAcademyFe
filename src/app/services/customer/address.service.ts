import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:9090/app/address/'
  
  constructor(private http: HttpClient) { }

  getAddress(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listAddressByCustomer(customerId:number){
    return this.http.get(this.apiUrl + "listByCustomer?customerId="+customerId);
  }

  createAddress(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateAddress(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

  deleteAddress(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }
}
