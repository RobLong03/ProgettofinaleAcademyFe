import { Location } from '@angular/common';
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
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { CartItemService } from '../../../services/cart/cart-item.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  productList: any = {};
  response: any;
  category: string | null = null;
  showSpinner=true;
  customerId: number | null;
  isLoggedIn:boolean=false;
  selectedTypes:string[]=[];
  selectedMinPrice:number=1;
  selectedMaxPrice:number=2000;
  selectedBrands:string[]=[];
  formRetrieveFilter!: FormGroup;
  types:any=[];
  brands:any=[];
  checked=false;

  constructor(
    private prodS: ProductService,
    private caseS: CaseService,
    private cpuS: CpuService,
    private gpuS: GpuService,
    private motherboardS: MotherboardService,
    private psuS: PsuService,
    private ramS: RamService,
    private storageS: StorageService,
    private thisRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private wishlItemS: WishlistItemService,
    private cartItemS: CartItemService,
    private fb:FormBuilder,
    private userValues:SessionStorageService,
    private authS:AuthServiceService
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.isLoggedIn = this.authS.isAuthenticatedCustomer();
  }

  onClick(prodId: number) {
    const productChosen = this.productList?.find((prod: any) => prod.id === prodId);

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

        case "gpu":
          console.log("Il prodotto scelto contiene 'gpu' nella descrizione.");
          this.router.navigate(['product/gpu/' + productChosen.id]);
          break;
          
        default:
          alert("Prodotto non trovato")
      }
    }

    const productType = productChosen.type.trim().toLowerCase();
    const categoryRoutes: { [key: string]: string } = {
      case: "case",
      cpu: "cpu",
      ram: "ram",
      motherboard: "motherboard",
      psu: "psu",
      gpu: "gpu",
      storage: "storage",
    };

    if (categoryRoutes[productType]) {
      this.router.navigate([`product/${categoryRoutes[productType]}/${productChosen.id}`]);
    } else {

    }
  }

  ngOnInit(): void {

    this.thisRoute.paramMap.subscribe(params => {
      const category = params.get('category')?.trim().toLowerCase() || null;
      this.category = category;
      this.showSpinner=true;
      this.productList={};

      const serviceMap: { [key: string]: any } = {
        case: this.caseS.listCase(),
        cpu: this.cpuS.listCpu(),
        ram: this.ramS.listRam(),
        motherboard: this.motherboardS.listMotherboard(),
        psu: this.psuS.listPsu(),
        gpu: this.gpuS.listGpu(),
        storage: this.storageS.listStorage(),
      };

      if (category && serviceMap[category]) {
        serviceMap[category].subscribe((resp: any) => {
          setTimeout(() => {
            this.showSpinner=false;
            this.response = resp;
            this.productList = this.response.dati;

            this.initializeFilter();
            this.checked=true;
            this.initializeFilterForm(this.checked);
          }, 224);
        });
      } else {
        this.prodS.listProduct().subscribe(resp => {
          setTimeout(() => {
            this.showSpinner=false;
            this.response = resp;
            this.productList = this.response.dati;

            this.initializeFilter();
            this.initializeFilterForm(this.checked);
          }, 224);

        });
      }
    });
  }
  
  initializeFilter() {

    this.productList.forEach((product:any) => {

      const type=product.type;
      const brand=product.brand;

      if (!this.types.some((t:any) => t.name===type)) {
        this.types.push({ name:type, selected:false });
      }

      if (!this.brands.some((b:any) => b.name===brand)) {
        this.brands.push({ name:brand, selected:false });
      }
    });
  }

  initializeFilterForm(checked:boolean):void {

    this.formRetrieveFilter=this.fb.group({
      //FormArray di FormControl inizializzati a false
      selectedTypesForm:this.fb.array(this.types.map(() => this.fb.control({ value:checked, disabled: checked}))),
      selectedMinPriceForm:new FormControl(this.selectedMinPrice),
      selectedMaxPriceForm:new FormControl(this.selectedMaxPrice),
      selectedBrandsForm:this.fb.array(this.brands.map(() => this.fb.control(false)))
    });
  }

  retrieveFilter(): void {
    const selectedTypesFormArray=this.formRetrieveFilter.get('selectedTypesForm') as FormArray;
    this.selectedTypes=selectedTypesFormArray.controls
      .map((ctrl, i) => (ctrl.value ? this.types[i].name : null))
      .filter(name => name!==null) as string[];

    const selectedBrandsFormArray=this.formRetrieveFilter.get('selectedBrandsForm') as FormArray;
    this.selectedBrands=selectedBrandsFormArray.controls
      .map((ctrl, i) => (ctrl.value ? this.brands[i].name : null))
      .filter(name => name!==null) as string[];

    this.selectedMinPrice=(this.formRetrieveFilter.value.selectedMinPriceForm!==this.selectedMinPrice)
      ? this.formRetrieveFilter.value.selectedMinPriceForm : this.selectedMinPrice

    this.selectedMaxPrice=(this.formRetrieveFilter.value.selectedMaxPriceForm!==this.selectedMaxPrice)
      ? this.formRetrieveFilter.value.selectedMaxPriceForm : this.selectedMaxPrice

    //console.log(this.selectedTypes);
    //console.log(this.selectedBrands);
    //console.log(this.selectedMinPrice);
    //console.log(this.selectedMaxPrice);

    this.getFilteredValue(this.selectedTypes, this.selectedMinPrice, this.selectedMaxPrice, this.selectedBrands);
  }

  getFilteredValue(t:string[], minP:number, maxP:number, b:string[]) {

    this.prodS.filteredListProduct(t, minP, maxP, b)
      .subscribe((resp:any) => {

        console.log(resp.dati);
        this.productList=resp.dati;
      })
  }

  addToWishlist(productId: number) {
    this.wishlItemS.createWishlistItem({ productId }, this.customerId!).subscribe((resp: any) => {
      console.log(resp.rc);
    });
  }

  addToCart(productId:number) {
    this.cartItemS.createCartItem({ productId }, this.customerId!).subscribe((resp: any) => {
      console.log(resp.rc);
    });
  }

  goback() {
    this.location.back();
  }
}
