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

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit {
  product: any;

  constructor(
    private caseS: CaseService,
    private cpuS: CpuService,
    private gpuS: GpuService,
    private motherboardS: MotherboardService,
    private psuS: PsuService,
    private ramS: RamService,
    private storageS: StorageService,
    private zone: NgZone,
    private route: ActivatedRoute,
    private location: Location,
    private wishlItemS: WishlistItemService,
    private cartItems: CartItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const category = params.get('category')?.trim().toLowerCase();

      if (!id || !category) {
        console.error("Invalid product ID or category.");

        return;
      }


      const serviceMap: { [key: string]: any } = {
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
    this.wishlItemS.createWishlistItem({ productId }, 2).subscribe(
      (resp: any) => console.log(resp.rc),
      error => console.error("Error adding to wishlist:", error)
    );
  }

  goback() {
    this.location.back();
  }
}
