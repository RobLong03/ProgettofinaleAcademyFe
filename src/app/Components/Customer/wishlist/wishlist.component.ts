import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { CartItemService } from '../../../services/cart/cart-item.service';

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
    private cartItemS:CartItemService,
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

  addToCart(productId:number) {
    
    this.cartItemS.createCartItem({ productId }, this.customerId!).subscribe((resp: any) => {
      console.log("ciao!! "+resp.rc);
    });
  }

  deleteItem(id:number) {

    this.wishlistItem.deleteWishlistItem({
      id:id
    })
    .subscribe((resp:any) => {

      console.log("baubau "+resp.rc);
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
