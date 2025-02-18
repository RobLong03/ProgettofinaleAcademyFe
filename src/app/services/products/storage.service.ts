import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private apiUrl = 'http://localhost:9090/app/product/storage/'
        
  constructor(private http: HttpClient) { }

  getStorage(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listStorage(){
    return this.http.get(this.apiUrl + "list");
  }

  createStorage(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateStorage(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
