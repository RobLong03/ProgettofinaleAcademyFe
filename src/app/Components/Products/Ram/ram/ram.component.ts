import { Component, OnInit } from '@angular/core';
import { RamService } from '../../../../services/products/ram.service';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.css'
})
export class RamComponent implements OnInit{

  response:any;
  rams:any;

  constructor(private ramS:RamService) { }
  
  ngOnInit(): void {
    
    this.ramS.listRam()
      .subscribe((resp:any) => {

        this.rams=resp.dati;
        console.log(this.rams);
      });
  }
}
