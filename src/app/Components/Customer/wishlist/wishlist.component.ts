import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  items:any;

  constructor(
    private wishlist:WishlistService,
    private wishlistItem:WishlistItemService,
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

    this.wishlist.emptyWishlist({
      id:parseInt(this.route.parent?.snapshot.paramMap.get("id")!) //sostituire parametro con valore preso da local storage
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
