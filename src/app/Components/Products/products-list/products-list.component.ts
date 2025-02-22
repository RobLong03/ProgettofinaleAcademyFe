import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { CaseService } from '../../../services/products/case.service';
import { CpuService } from '../../../services/products/cpu.service';
import { GpuService } from '../../../services/products/gpu.service';
import { MotherboardService } from '../../../services/products/motherboard.service';
import { PsuService } from '../../../services/products/psu.service';
import { RamService } from '../../../services/products/ram.service';
import { StorageService } from '../../../services/products/storage.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  productList: any;
  response: any;


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



  constructor(private prodS: ProductService, private caseS: CaseService,
    private cpuS: CpuService, private gpuS: GpuService,private motherboardS: MotherboardService,
    private psuS: PsuService,private ramS: RamService, private storageS: StorageService,
    private thisRoute: ActivatedRoute
    , private router: Router, private wishlItemS: WishlistItemService) { }

  onClick(prodId: number) {
    //logica per capire che prodotto è

    let productChosen = this.productList?.find((prod: any) => prod.id == prodId);
    console.log(productChosen)

    //prendo il prodotto dalla lista con id
    if (productChosen) {
      switch (productChosen.type.toLowerCase()) {
        case "case":
          console.log("Il prodotto scelto contiene 'Case' nella descrizione.");
          this.router.navigate(['product/case/' + productChosen.id]);
          break;
        case "cpu":
          console.log("Il prodotto scelto contiene 'Cpu' nella descrizione.");
          this.router.navigate(['product/cpu/' + productChosen.id]);
          break;
        case "ram":
          console.log("Il prodotto scelto contiene 'Ram' nella descrizione.");
          this.router.navigate(['product/ram/' + productChosen.id]);
          break;
        case "motherboard":
          console.log("Il prodotto scelto contiene 'Motherboard' nella descrizione.");
          this.router.navigate(['product/motherboard/' + productChosen.id]);
          break;
        case "psu":
          console.log("Il prodotto scelto contiene 'Psu' nella descrizione.");
          this.router.navigate(['product/psu/' + productChosen.id]);
          break;
        case "storage":
          console.log("Il prodotto scelto contiene 'Storage' nella descrizione.");
          this.router.navigate(['product/storage/' + productChosen.id]);
          break;

        case "case":
          console.log("Il prodotto scelto contiene 'gpu' nella descrizione.");
          this.router.navigate(['product/gpu/' + productChosen.id]);
          break;


        default:
          alert("Prodotto non trovato")
      }
    }
    /*
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


*/
  }

  ngOnInit(): void {
    this.prodS.listProduct()
      .subscribe(resp => {
        this.response = resp;
        this.productList = this.response.dati.map((product: any, index: number) => ({
          ...product,
          imageUrl: product.imageUrl || this.imageUrls[index] || '' //se gia presente un campo imageUrl o comunque se gia assegnato usa quello, altrimenti usa un link dalla lista immagini
        }));

    this.thisRoute.paramMap.subscribe(params => {
      const category = String(params.get('category'));
      if (category) {
        switch (category.toLowerCase()) {
          case "case":
            this.caseS.listCase()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;

              });

            //this.router.navigate(['product/' + category]);
            break;
          case "cpu":
            this.cpuS.listCpu()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;

              });
            break;
          case "ram":
            this.ramS.listRam()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;
              });
            break;
          case "motherboard":
            this.motherboardS.listMotherboard()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;
              });
            break;
          case "psu":
            this.psuS.listPsu()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;
              });
            break;
            case "gpu":
              this.gpuS.listGpu()
                .subscribe(resp => {
                  this.response = resp;
                  this.productList = this.response.dati;
                });
              break;
          case "storage":
            this.storageS.listStorage()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;
              });
            break;



          default:
            this.prodS.listProduct()
              .subscribe(resp => {
                this.response = resp;
                this.productList = this.response.dati;

              });
        }
      }

    })});

  }

  addToWishlist(productId: number) {

    this.wishlItemS.createWishlistItem({ productId: productId }, 2)
      .subscribe((resp: any) => {

        console.log(resp.rc);
      });
  }
}
