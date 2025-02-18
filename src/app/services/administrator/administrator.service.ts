import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private apiUrl = 'http://localhost:9090/app/administrator/'
  
  constructor(private http: HttpClient) { }

  getAdministrator(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listAdministrator(){
    return this.http.get(this.apiUrl + "list");
  }

  createAdministrator(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateAdministrator(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

  deleteAdministrator(id : number){
    return this.http.get(this.apiUrl + "delete?id=" + id);
  }
}
