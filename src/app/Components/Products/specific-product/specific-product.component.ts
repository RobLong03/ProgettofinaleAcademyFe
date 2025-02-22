import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../../services/products/case.service';
import { CpuService } from '../../../services/products/cpu.service';
import { GpuService } from '../../../services/products/gpu.service';
import { MotherboardService } from '../../../services/products/motherboard.service';
import { ProductService } from '../../../services/products/product.service';
import { PsuService } from '../../../services/products/psu.service';
import { RamService } from '../../../services/products/ram.service';
import { StorageService } from '../../../services/products/storage.service';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit {

  product: any;
  response: any;

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
    private wishlItemS: WishlistItemService
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID dal link
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const category = String(params.get('category'));

      // Verifica la categoria e recupera il prodotto
      if (category) {
        console.log(category);
        switch (category) {
          case "case":
            this.caseS.getCase(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          case "cpu":
            this.cpuS.getCpu(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          case "ram":
            this.ramS.getRam(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          case "motherboard":
            this.motherboardS.getMotherboard(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          case "psu":
            this.psuS.getPsu(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          case "storage":
            this.storageS.getStorage(id)
              .subscribe((resp: any) => {
                this.product = resp.dati;
                console.log(resp);
              });
            break;
          default:
            alert("Prodotto non trovato");
        }
      } else {
        alert("Prodotto non trovato");
      }
    });
  }

  addToWishlist(productId: number) {
    this.wishlItemS.createWishlistItem({ productId: productId }, 2)
      .subscribe((resp: any) => {
        console.log(resp.rc);
      });
  }

  goback(){
    this.location.back()
  }
}
