import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  items:any;

  constructor(
    private wishlist:WishlistService,
    private route:ActivatedRoute
  ) { }
  
  ngOnInit(): void {

    //recupero id dall'url padre(senza 'parent' non funziona, 
    //perchè nel paramMap del componente wishlist il parametro id non esiste)
    this.wishlist.getWishlist(parseInt(this.route.parent?.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) => {

      this.items=resp.dati.wishlistItems;
      console.log(this.items);
    });
  }

  emptyWishlist() {

    this.wishlist.emptyWishlist(parseInt(this.route.parent?.snapshot.paramMap.get("id")!))
      .subscribe((resp:any) => {

        console.log(resp.rc);
      })
  }
}
