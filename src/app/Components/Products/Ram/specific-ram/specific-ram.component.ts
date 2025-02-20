import { Component, OnInit } from '@angular/core';
import { RamService } from '../../../../services/products/ram.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-ram',
  templateUrl: './specific-ram.component.html',
  styleUrl: './specific-ram.component.css'
})
export class SpecificRamComponent implements OnInit{

  ram:any;

  constructor(private ramS:RamService, private route:ActivatedRoute) { }
  
  ngOnInit(): void {

    this.ramS.getRam(parseInt(this.route.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) => {

        this.ram=resp.dati;
        console.log(this.ram);
      });
  }
}
