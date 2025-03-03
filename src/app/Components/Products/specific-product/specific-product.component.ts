import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../../services/products/case.service';
import { CpuService } from '../../../services/products/cpu.service';
import { GpuService } from '../../../services/products/gpu.service';
import { MotherboardService } from '../../../services/products/motherboard.service';
import { PsuService } from '../../../services/products/psu.service';
import { RamService } from '../../../services/products/ram.service';
import { StorageService } from '../../../services/products/storage.service';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { Location } from '@angular/common';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { Product } from '../../../Interfaces/order';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit {
  product: any;
  isLoggedIn:boolean=false;
  customerId: number | null=0;
  wishlistId: number | null=0;

  constructor(
    private caseS: CaseService,
    private cpuS: CpuService,
    private gpuS: GpuService,
    private motherboardS: MotherboardService,
    private psuS: PsuService,
    private ramS: RamService,
    private storageS: StorageService,
    private prodS: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private wishlItemS: WishlistItemService,
    private cartItemS: CartItemService,
    private userValues:SessionStorageService,
    private authS:AuthServiceService
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.wishlistId = parseInt(this.userValues.idWishListCliente!);
    this.isLoggedIn = this.authS.isAuthenticatedCustomer();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const category = params.get('category')?.trim().toLowerCase();

      if (!id || !category) {
        console.error("Invalid product ID or category.");

        return;
      }


      const serviceMap: { [key: string]: any } = {
        product: this.prodS.getProduct(id),
        case: this.caseS.getCase(id),
        cpu: this.cpuS.getCpu(id),
        gpu:this.gpuS.getGpu(id),
        ram: this.ramS.getRam(id),
        motherboard: this.motherboardS.getMotherboard(id),
        psu: this.psuS.getPsu(id),
        storage: this.storageS.getStorage(id),
      };

      if (serviceMap[category]) {
        serviceMap[category].subscribe(
          (resp: any) => {
            this.product = resp?.dati;
            if (!this.product) {
              console.warn("Product data is empty.");

            }
          },
          (error: any) => {
            console.error("Error fetching product:", error);
            alert("Errore nel recupero del prodotto");
          }
        );
      } else {

      }
    });
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
