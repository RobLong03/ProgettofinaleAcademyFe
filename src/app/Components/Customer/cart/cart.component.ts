import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { CartService } from '../../../services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: any;

  constructor(
    private cartItem: CartItemService,
    private cart: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cart
      .getCart(parseInt(this.route.parent?.snapshot.paramMap.get('id')!))
      .subscribe((resp: any) => {
        this.items = resp.dati.cartItems;
        console.log(this.items);
      });
  }

  deleteItem(id: number) {
    this.cartItem
      .removeCartItem({
        id: id,
      })
      .subscribe((resp: any) => {
        console.log(resp.rc);
        if (resp.rc) {
          this.items = this.items.filter((it: any) => it.id !== id);
        }
      });
  }

  emptyCart() {
    this.cart
      .clearCart({
        id: parseInt(this.route.parent?.snapshot.paramMap.get('id')!),
      })
      .subscribe((resp: any) => {
        console.log(resp.rc);
        if (resp.rc) {
          this.items = [];
        }
      });
  }

  reduceItem(id: number) {
    // Trova l'articolo nel carrello
    const item = this.items.find((it: any) => it.id === id);

    if (item) {
      // Se la quantità è maggiore di 1, la riduce di 1
      if (item.quantity > 1) {
        this.cartItem
          .removeItemsCart({
            id: id,
            quantity: item.quantity - 1,
          })
          .subscribe((resp: any) => {
            if (resp.rc) {
              item.quantity--;
            }
          });
      } else {
        // Se la quantità è 1, lo rimuove completamente
        this.cartItem.removeCartItem({ id: id }).subscribe((resp: any) => {
          if (resp.rc) {
            this.items = this.items.filter((it: any) => it.id !== id);
          }
        });
      }
    }
  }
}
