import { Component, OnInit } from '@angular/core';
import { MotherboardService } from '../../../../services/products/motherboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-motherboard',
  templateUrl: './specific-motherboard.component.html',
  styleUrl: './specific-motherboard.component.css'
})
export class SpecificMotherboardComponent implements OnInit{

  motherboard:any;

  constructor(private motherbS:MotherboardService, private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.motherbS.getMotherboard(parseInt(this.route.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) =>{

        this.motherboard=resp.dati;
        console.log(this.motherboard);
      });
  }
}
