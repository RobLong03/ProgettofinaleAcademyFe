import { Component } from '@angular/core';
import { CpuService } from '../../../../services/products/cpu.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.css'
})
export class CpuComponent {
onClick(arg0: any) {
throw new Error('Method not implemented.');
}

  cpuList : any;
  response : any;
  imageUrls = [
    { image: "https://as1.ftcdn.net/v2/jpg/00/81/24/72/1000_F_81247213_OYvGTCn5mnQQ2c0gWJ1U5ixcbmNBaMOp.jpg" },
    { image: "https://i.ibb.co/7dYFCy3h/cpu.jpg" },
    { image: "https://i.ibb.co/7dYFCy3h/cpu.jpg" },

  ];

  constructor(private cpuS : CpuService){}

  ngOnInit(): void {
    this.cpuS.listCpu()
   .subscribe(resp => {
    this.response = resp;
    this.cpuList = this.response.dati.map((product: any, index: number) => ({
      ...product,
      imageUrl: this.imageUrls[index] || ''
    }));
   });
  }


}
