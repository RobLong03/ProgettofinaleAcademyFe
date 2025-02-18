import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotherboardService {

  private apiUrl = 'http://localhost:9090/app/product/motherboard/'
    
  constructor(private http: HttpClient) { }

  getMotherboard(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listMotherboard(){
    return this.http.get(this.apiUrl + "list");
  }

  createMotherboard(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateMotherboard(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
