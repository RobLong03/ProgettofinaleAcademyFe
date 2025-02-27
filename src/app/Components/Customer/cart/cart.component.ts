import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { CartService } from '../../../services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: any;
  customerId: number | null;
  cartId: number | null;
  totalPrice: number | null | undefined;

  constructor(
    private cartItem: CartItemService,
    private cart: CartService,
    private route: ActivatedRoute,
    private userValues: SessionStorageService,
    private productS: ProductService
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.cartId = parseInt(this.userValues.idCarrelloCliente!);
  }

  ngOnInit(): void {
    this.cart.getCart(this.customerId!).subscribe((resp: any) => {
      this.items = resp.dati.items;
      this.totalPrice = resp.dati.totalPrice;
      this.items.forEach((item: any) => {
        this.productS.getProduct(item.productId).subscribe((product: any) => {
          item.product = product;
        });
      });
      console.log(this.items);
    });
  }

  updateDati() {
    this.cart.getCart(this.customerId!).subscribe((resp: any) => {
      this.items = resp.dati.items;
      this.totalPrice = resp.dati.totalPrice;
      this.items.forEach((item: any) => {
        this.productS.getProduct(item.productId).subscribe((product: any) => {
          item.product = product;
        });
      });
      console.log(this.items);
    });
  }

  deleteItem(id: number) {
    console.log(id);
    this.cartItem
      .removeCartItem({
        id: id,
      })
      .subscribe((resp: any) => {
        console.log(resp.rc);
        if (resp.rc) {
          this.updateDati();
        }
      });
  }

  emptyCart() {
    const cartId = this.cartId;  // Usa il cartId che hai già salvato nel componente
    if (cartId) {
      // Chiamata al servizio per svuotare il carrello
      this.cart.clearCart({ id: cartId })
        .subscribe((resp: any) => {
          console.log("Risposta clearCart:", resp);
          if (resp.rc) {
            this.updateDati();  // Svuota gli articoli dal carrello
          }
        });
    } else {
      console.error("Carrello ID non valido!");
    }
  }

  addQuantity(id: number) {
    // Trova l'articolo nel carrello
    const item = this.items.find((it: any) => it.id === id);

    if (item) {
      // Aumenta la quantità
      const updatedQuantity = item.quantity + 1;

      // Chiamata al servizio per aggiornare la quantità nel carrello
      this.cartItem
        .addCartItem({
          id: id,
          quantity: updatedQuantity,
        })
        .subscribe(
          (resp: any) => {
            // Se la risposta è positiva, aggiorna la quantità
            if (resp.rc) {
              this.updateDati();
            } else {
              // Puoi gestire eventuali errori in caso di risposta negativa
              console.error("Errore nell'aggiornamento della quantità", resp);
            }
          },
          (error: any) => {
            // Gestione degli errori nel caso di errore nella richiesta
            console.error('Errore di rete o altro:', error);
          }
        );
    }
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
              this.updateDati();
            }
          });
      } else {
        // Se la quantità è 1, lo rimuove completamente
        this.cartItem.removeCartItem({ id: id }).subscribe((resp: any) => {
          if (resp.rc) {
            this.updateDati();
          }
        });
      }
    }
  }
}
