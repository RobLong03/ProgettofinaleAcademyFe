import { Component, OnInit } from '@angular/core';
import { MotherboardService } from '../../../../services/products/motherboard.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistItemService } from '../../../../services/wishlist/wishlist-item.service';
import { CartItemService } from '../../../../services/cart/cart-item.service';

@Component({
  selector: 'app-specific-motherboard',
  templateUrl: './specific-motherboard.component.html',
  styleUrl: './specific-motherboard.component.css'
})
export class SpecificMotherboardComponent implements OnInit{

  motherboard:any;

  constructor(
    private motherbS:MotherboardService,
    private wishlItemS:WishlistItemService,
    private cartItems:CartItemService,
    private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.motherbS.getMotherboard(parseInt(this.route.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) =>{

        this.motherboard=resp.dati;
        console.log(this.motherboard);
      });
  }

  addToWishlist(productId:number) {

    this.wishlItemS.createWishlistItem({productId:productId}, 1)
      .subscribe((resp:any) => {

        console.log(resp.rc);
      });
  }

  addToCart(productId:number){

    this.cartItems.createCartItem({productId:productId}, 1)
      .subscribe((resp:any) => {
        console.log(resp.rc);
      });
  }
}
