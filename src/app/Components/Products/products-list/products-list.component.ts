import { Component } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  productList : any;
  response : any;

  constructor(private prodS : ProductService){}

  ngOnInit(): void {
    this.prodS.listProduct()
   .subscribe(resp => {
    this.response = resp;
    this.productList = this.response.dati;
   });
  }


}
