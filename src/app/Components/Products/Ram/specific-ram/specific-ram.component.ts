import { Component, OnInit } from '@angular/core';
import { RamService } from '../../../../services/products/ram.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistItemService } from '../../../../services/wishlist/wishlist-item.service';

@Component({
  selector: 'app-specific-ram',
  templateUrl: './specific-ram.component.html',
  styleUrl: './specific-ram.component.css'
})
export class SpecificRamComponent implements OnInit{

  ram:any;

  constructor(
    private ramS:RamService,
    private wishlItemS:WishlistItemService,
    private route:ActivatedRoute
  ) { }
  
  ngOnInit(): void {

    this.ramS.getRam(parseInt(this.route.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) => {

        this.ram=resp.dati;
        console.log(this.ram);
      });
  }

  addToWishlist(productId:number) {

    this.wishlItemS.createWishlistItem({productId:productId}, 2)
      .subscribe((resp:any) => {

        console.log(resp.rc);
      });
  }
}
