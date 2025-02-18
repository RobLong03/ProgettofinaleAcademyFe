import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PsuService {

  private apiUrl = 'http://localhost:9090/app/product/psu/'
    
  constructor(private http: HttpClient) { }

  getPsu(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listPsu(){
    return this.http.get(this.apiUrl + "list");
  }

  createPsu(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updatePsu(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
