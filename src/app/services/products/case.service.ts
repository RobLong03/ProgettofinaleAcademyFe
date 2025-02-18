import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'http://localhost:9090/app/product/case/'

  constructor(private http: HttpClient) { }

  getCase(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listCase(){
    return this.http.get(this.apiUrl + "list");
  }

  createCase(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateCase(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
