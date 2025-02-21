import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../services/cart/cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  cartId: number = 1;  // Qui definisci il cartId (puoi passarlo dinamicamente in base al tuo caso)

  constructor(private cartItemService: CartItemService) {}

  ngOnInit(): void {
    this.getCartItems(this.cartId);  // Passa il cartId al metodo
  }

  getCartItems(cartId: number): void {
    this.cartItemService.listByCart(cartId).subscribe(
      (items:any) => {
        this.cartItems = items;
      },
      (error) => {
        console.error('Errore nel recupero degli articoli nel carrello:', error);
      }
    );
  }
}
