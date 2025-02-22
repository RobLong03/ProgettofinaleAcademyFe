import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { SessionStorageService } from '../../../utils/session-storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  items:any;
  customerId: number | null;
  wishlistId: number | null;

  constructor(
    private wishlist:WishlistService,
    private wishlistItem:WishlistItemService,
    private route:ActivatedRoute,
    private userValues:SessionStorageService
  ) { 
    this.customerId = parseInt(this.userValues.idCliente!);
    this.wishlistId = parseInt(this.userValues.idWishListCliente!);
  }
  
  ngOnInit(): void {

    this.wishlist.getWishlist(this.customerId!)
      .subscribe((resp:any) => {

      this.items=resp.dati.wishlistItems;
      console.log(this.items);
    });
  }

  deleteItem(id:number) {

    this.wishlistItem.deleteWishlistItem({
      id:id
    })
    .subscribe((resp:any) => {

      console.log(resp.rc);
      if(resp.rc) {
        //aggiorno array items andando a filtrare elementi con id diverso da quello passato,
        //utile perchè le modifiche vengono visualizzate in automatico senza ricaricare pagina
        this.items=this.items.filter((it:any) => it.id!==id);
      }
    });
  }

  emptyWishlist() {
    console.log("wishlistId");
    console.log("wishlistId"+this.wishlistId);
    this.wishlist.emptyWishlist({
      id : this.wishlistId! //sostituire parametro con valore preso da local storage
    })
    .subscribe((resp:any) => {

      console.log(resp.rc);
      if(resp.rc) {
        //svuoto lista items
        this.items=[];
      }
    });
  }
}
