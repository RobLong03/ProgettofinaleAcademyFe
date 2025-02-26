import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9090/app/product/'

  constructor(private http: HttpClient) { }

  getProduct(id : number){
    return this.http.get(this.apiUrl + "get?id=" + id);
  }

  listProduct(){
    return this.http.get(this.apiUrl + "list");
  }

  filteredListProduct(types:string[] | null, minPrice:number, maxPrice:number, brands:string[] | null){

    let param=new HttpParams();

    if(types?.length) {
      param=param.set("types", types.join(","));
    }

    if(minPrice != null) {
      param=param.set("minPrice", minPrice.toString());
    }

    if(maxPrice != null) {
      param=param.set("maxPrice", maxPrice.toString());
    }

    if(brands?.length) {
      param=param.set("brands", brands.join());
    }
    
    return this.http.get(this.apiUrl + "filteredList?"+param);
  }

  createProduct(body : {}){
    return this.http.post(this.apiUrl + "create", body);
  }

  updateProduct(body : {}){
    return this.http.post(this.apiUrl + "update", body);
  }

  deleteProduct(body : {}){
    return this.http.post(this.apiUrl + "delete", body);
  }
}
