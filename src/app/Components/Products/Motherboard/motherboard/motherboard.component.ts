import { Component, OnInit } from '@angular/core';
import { MotherboardService } from '../../../../services/products/motherboard.service';
import { WishlistItemService } from '../../../../services/wishlist/wishlist-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrl: './motherboard.component.css'
})
export class MotherboardComponent implements OnInit{

  motherboards:any;

  constructor(
    private motherbS:MotherboardService,
    private wishlItemS:WishlistItemService,
    private router:Router 
  ) { }
  
  ngOnInit(): void {

    this.motherbS.listMotherboard()
      .subscribe((resp:any) => {
        
        this.motherboards=resp.dati;
        console.log(this.motherboards);
      });
  }

  goToDetail(id: number) {
    
    this.router.navigate(['/product/motherboard', id]);
  }

  addToWishlist(productId:number) {

    this.wishlItemS.createWishlistItem({productId:productId}, 1)
      .subscribe((resp:any) => {

        console.log(resp.rc);
      });
  }
}
