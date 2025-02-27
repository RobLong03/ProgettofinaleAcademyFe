import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl = 'http://localhost:9090/app/product/color/'

  constructor(private http:HttpClient) { }


  getColor(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listColor(){
    return this.http.get(this.apiUrl + "list");
  }

  createColor(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateColor(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

}
