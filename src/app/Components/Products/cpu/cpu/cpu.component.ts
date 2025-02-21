import { Component } from '@angular/core';
import { CpuService } from '../../../../services/products/cpu.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.css'
})
export class CpuComponent {

  cpuList : any;
  response : any;

  constructor(private cpuS : CpuService){}

  ngOnInit(): void {
    this.cpuS.listCpu()
   .subscribe(resp => {
    this.response = resp;
    this.cpuList = this.response.dati;
   });
  }


}
