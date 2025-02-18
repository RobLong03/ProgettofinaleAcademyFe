import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpuService {
  private apiUrl = 'http://localhost:9090/app/product/gpu/'
  
  constructor(private http: HttpClient) { }

  getGpu(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listGpu(){
    return this.http.get(this.apiUrl + "list");
  }

  createGpu(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateGpu(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }
}
