import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RamService {

  private apiUrl = 'http://localhost:9090/app/product/ram/'
      
  constructor(private http: HttpClient) { }

  getRam(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listRam(){
    return this.http.get(this.apiUrl + "list");
  }

  createRam(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateRam(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
