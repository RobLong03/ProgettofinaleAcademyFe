import { Component } from '@angular/core';
import { CpuService } from '../../../../services/products/cpu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cpu-product',
  templateUrl: './cpu-product.component.html',
  styleUrl: './cpu-product.component.css'
})
export class CpuProductComponent {

  cpu : any;
  response : any;

  constructor(private cpuS : CpuService, private thisRoute: ActivatedRoute){}

  ngOnInit(): void {
    // Ottieni l'ID dal link
    this.thisRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Passa l'ID al metodo getCpu
      this.cpuS.getCpu(id).subscribe(resp => {
        this.response = resp;
        this.cpu = this.response.dati;
      });
    });
  }




}
