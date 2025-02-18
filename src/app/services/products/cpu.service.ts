import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuService {
  private apiUrl = 'http://localhost:9090/app/product/cpu/'

  constructor(private http: HttpClient) { }

  getCpu(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listCpu(){
    return this.http.get(this.apiUrl + "list");
  }

  createCpu(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateCpu(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
