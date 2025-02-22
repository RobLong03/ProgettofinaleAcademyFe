import { Component, OnInit } from '@angular/core';
import { CpuService } from '../../../../services/products/cpu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../../../services/products/case.service';
import { GpuService } from '../../../../services/products/gpu.service';
import { MotherboardService } from '../../../../services/products/motherboard.service';
import { ProductService } from '../../../../services/products/product.service';
import { PsuService } from '../../../../services/products/psu.service';
import { RamService } from '../../../../services/products/ram.service';
import { StorageService } from '../../../../services/products/storage.service';
import { WishlistItemService } from '../../../../services/wishlist/wishlist-item.service';

@Component({
  selector: 'app-specific-cpu',
  templateUrl: './specific-cpu.component.html',
  styleUrl: './specific-cpu.component.css'
})
export class SpecificCpuComponent implements  OnInit {

  product : any;
  response : any;

 constructor(private prodS: ProductService, private caseS: CaseService,
     private cpuS: CpuService, private gpuS: GpuService,private motherboardS: MotherboardService,
     private psuS: PsuService,private ramS: RamService, private storageS: StorageService,
     private thisRoute: ActivatedRoute
     , private router: Router, private wishlItemS: WishlistItemService) { }

  ngOnInit(): void {
    // Ottieni l'ID dal link
    this.thisRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const category = String(params.get('category'));
      // Passa l'ID al metodo

    });
  }

}
