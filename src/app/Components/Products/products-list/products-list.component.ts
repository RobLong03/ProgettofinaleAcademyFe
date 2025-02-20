import { Component } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  productList : any;
  response : any;

  constructor(private prodS : ProductService, private router: Router){}

  onClick(prodId:number){
    //logica per campre che prodotto è

    let productChosen = this.productList?.find((prod:any) => prod.id == prodId);

    //prendo il prodotto dalla lista con id 

    if (productChosen) {
      console.log("Prodotto trovato:", productChosen);
      // Qui puoi fare altre operazioni con productChosen

      if (productChosen.description.toLowerCase().includes("cpu")) {
        console.log("Il prodotto scelto contiene 'Cpu' nella descrizione.");
        this.router.navigate(['product/cpu/' + productChosen.id]);
    }

    } else {
      console.log("Prodotto non trovato!");
    }

    

  }

  ngOnInit(): void {
    this.prodS.listProduct()
   .subscribe(resp => {
    this.response = resp;
    this.productList = this.response.dati;
   });
  }


}
