import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:9090/app/customer/'
    
  constructor(private http: HttpClient) { }

  getCustomer(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listCustomer(){
    return this.http.get(this.apiUrl + "list");
  }

  createCustomer(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateCustomer(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

  deleteCustomer(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }

  signInCustomer(body :{}){
    return this.http.post(this.apiUrl + "signIn", body);
  }
}
