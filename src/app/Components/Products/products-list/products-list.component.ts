import { Component } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Router } from '@angular/router';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  productList : any;
  response : any;
  imageUrls = [
    { image: "https://as1.ftcdn.net/v2/jpg/00/81/24/72/1000_F_81247213_OYvGTCn5mnQQ2c0gWJ1U5ixcbmNBaMOp.jpg" },
    { image: "https://www.hellotech.com/blog/wp-content/uploads/2020/02/what-is-a-gpu.jpg" },

    { image: "https://i.ibb.co/5Wfs3dj7/ssd.jpg" },
    { image: "https://i.ibb.co/q31bvYx9/ram.jpg" },
    { image: "https://i.ibb.co/3yrd0QnF/hdd.jpg" },
    { image: "https://i.ibb.co/hxL7tvFJ/motherboard.jpg" },
    { image: "https://i.ibb.co/Rkkhw7Gr/gpu.jpg" },
    { image: "https://i.ibb.co/0jjJCNcz/case.jpg" },
    { image: "https://i.ibb.co/XZWxg4sP/psu.jpg" },
    { image: "https://i.ibb.co/7dYFCy3h/cpu.jpg" },
    { image: "https://i.ibb.co/dJkZ9BRK/products.jpg" } // Generic product image
  ];



  constructor(private prodS : ProductService, private router: Router, private wishlItemS:WishlistItemService){}

  onClick(prodId:number){
    //logica per campre che prodotto è

    let productChosen = this.productList?.find((prod:any) => prod.id == prodId);

    //prendo il prodotto dalla lista con id

    if (productChosen) {
      console.log("Prodotto trovato:", productChosen);
      // Qui puoi fare altre operazioni con productChosen

      if (productChosen.type.toLowerCase().includes("cpu")) {
        console.log("Il prodotto scelto contiene 'Cpu' nella descrizione.");
        this.router.navigate(['product/cpu/' + productChosen.id]);
      }

      if (productChosen.type.toLowerCase().includes("ram")) {
        console.log("Il prodotto scelto contiene 'Ram' nella descrizione.");
        this.router.navigate(['product/ram/' + productChosen.id]);
      }

      if (productChosen.type.toLowerCase().includes("motherboard")) {
        console.log("Il prodotto scelto contiene 'motherboard' nella descrizione.");
        this.router.navigate(['product/motherboard/' + productChosen.id]);
      }

    } else {
      console.log("Prodotto non trovato!");
    }



  }

  ngOnInit(): void {
    this.prodS.listProduct()
   .subscribe(resp => {
    this.response = resp;
    this.productList = this.response.dati.map((product: any, index: number) => ({
      ...product,
      imageUrl: this.imageUrls[index] || ''
    }));

   });
  }

  addToWishlist(productId:number) {

    this.wishlItemS.createWishlistItem({productId:productId}, 2)
      .subscribe((resp:any) => {

        console.log(resp.rc);
      });
  }
}
