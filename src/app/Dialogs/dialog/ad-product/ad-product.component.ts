import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { CaseService } from '../../../services/products/case.service';
import { CpuService } from '../../../services/products/cpu.service';
import { GpuService } from '../../../services/products/gpu.service';
import { MotherboardService } from '../../../services/products/motherboard.service';
import { ProductService } from '../../../services/products/product.service';
import { PsuService } from '../../../services/products/psu.service';
import { RamService } from '../../../services/products/ram.service';
import { StorageService } from '../../../services/products/storage.service';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';

@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrl: './ad-product.component.css'
})
export class AdProductComponent {

  rc:boolean=true;
  msg:string="";


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
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AdProductComponent>
  ) {}



  onSubmit(cr: NgForm) {

    const serviceMap: { [key: string]: any } = {
      case: this.caseS.listCase(),
      cpu: this.cpuS.listCpu(),
      ram: this.ramS.listRam(),
      motherboard: this.motherboardS.listMotherboard(),
      psu: this.psuS.listPsu(),
      gpu: this.gpuS.listGpu(),
      storage: this.storageS.listStorage(),
    };



    this.prodS.createProduct({
      userName: cr.form.value.username,
      pwd: cr.form.value.password,
      role : cr.form.value.admin ? "ADMIN" : "USER"
    }).subscribe((r:any) => {

      this.rc=r.rc;
      this.msg = r.msg;
      console.log(r);
      if (r.rc){
        this.dialogRef.close("reload");
      }
    })


}
}
