import { Component, OnInit } from '@angular/core';
import { RamService } from '../../../../services/products/ram.service';
import { WishlistItemService } from '../../../../services/wishlist/wishlist-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.css'
})
export class RamComponent implements OnInit{

  rams:any;

  constructor(
    private ramS:RamService,
    private wishlItemS:WishlistItemService,
    private router:Router
  ) { }
  
  ngOnInit(): void {
    
    this.ramS.listRam()
      .subscribe((resp:any) => {

        this.rams=resp.dati;
        console.log(this.rams);
      });
  }

  goToDetail(id:number) {

    this.router.navigate(["/product/ram", id]);
  }

  addToWishlist(productId:number) {

    this.wishlItemS.createWishlistItem({productId:productId}, 2)
      .subscribe((resp:any) => {

        console.log(resp.rc);
      });
  }
}
