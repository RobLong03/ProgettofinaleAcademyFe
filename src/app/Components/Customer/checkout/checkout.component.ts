import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AddressService } from '../../../services/customer/address.service';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { ProductService } from '../../../services/products/product.service';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  customerId: number;
  cartId: number;

  addresses: any;
  selectedAddress: any;

  itemsFromCart: any;

  orderItems: any;

  paymentMethod: string = 'cash'; // Default payment method

  totalprice: number = 0;

  constructor(
    private userValues: SessionStorageService,
    private addressS: AddressService,
    private cartitemS: CartItemService,
    private productS: ProductService,
    private orderS: OrderService,
    private redRoute: Router
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.cartId = parseInt(this.userValues.idCarrelloCliente!);
  }

  ngOnInit(): void {
    this.orderItems = [];
    if (this.customerId)
      this.fetchAddresses(this.customerId);

    if (this.cartId)
      this.fetchCartItems(this.cartId);
  }

  private fetchAddresses(cId: number) {
    this.addressS.listAddressByCustomer(cId).subscribe((resp:any) => {
      this.addresses = resp.dati;
      console.log(this.addresses);
    });
  }

  private fetchCartItems(cart: number) {
    this.cartitemS.listByCart(cart).subscribe((resp:any) => {
      this.itemsFromCart = resp.dati;
      this.getItemsAndAsignToOrder();
    });
  }

  private getItemsAndAsignToOrder() {
    this.orderItems = []; // sistemazione temporanea, da aggiornre dto e poi aggiornare questo metodo
    this.totalprice = 0;
    for (let cartItem of this.itemsFromCart) {
      this.productS.getProduct(cartItem.productId).subscribe((resp:any) => {
        const combinedItem = {
          ...resp.dati, //i campi di product
          cartItemId: cartItem.id, //+ quelli di cartitem presi a mano
          cartId: cartItem.cartId,
          quantity: cartItem.quantity,
        };
        this.totalprice = this.totalprice + (combinedItem.price * combinedItem.quantity);
        this.orderItems.push(combinedItem);
      });
    }
  }

  onAddressChange(addressId: number) {
    this.selectedAddress = this.addresses.find((addr: any) => addr.id === addressId);
  }

  onPaymentMethodChange(event: any) {
    this.paymentMethod = event.value;
  }

  removeItems(cartItemId: number, productId: number) {
    let item = this.orderItems.find((ordItm: any) => ordItm.id == productId);
    let qty:number = item.quantity;

    if (item) {
      //ho generato un id dinamico per il select di ogni item, cosi facendo dovrei avere l'elemento per cui ho clicato
      const inputElement = document.getElementById(`remQty${productId}`) as HTMLInputElement;
      qty = inputElement.textContent ? Number.parseInt(inputElement.textContent) : qty;
    }

    console.log("Removing items from cart:");
    console.log("Cart Item ID:", cartItemId);
    console.log("Product ID:", productId);
    console.log("Quantity to remove:", qty);

    console.log(item);
    if ((item.quantity - qty) > 0) {
      console.log("item qty>0");
       this.cartitemS.removeItemsCart({
         id        :   item.cartItemId,
         productId :   item.id,
         cartId    :   item.cartId,
         quantity  :   qty,
       }).subscribe((r:any)=>{
        this.fetchCartItems(item.cartId);
       }
      )
    } else {
      console.log("item qty<=0");
      this.cartitemS.removeCartItem({
        id: cartItemId
      }).subscribe((r:any)=>
        {
          this.fetchCartItems(item.cartId);
        } );
    }

  }

  updateRemoveQuantity(item: any) {
    item.removeQuantity = Math.max(1, Math.min(item.quantity, item.removeQuantity || 1)); //limita tra 1 e max quantity
  }

  onSubmit(orderForm: NgForm) {
    console.log("Saving order....");
    console.log({
      addressId : this.selectedAddress.id,
      customerId: this.customerId
    })

    this.orderS.createOrder({
      addressId : this.selectedAddress.id,
      customerId: this.customerId
    }).subscribe((r:any)=>
    {
      console.log(r)
      if(r.rc == true || r.rc == "true"){
        console.log("completato l'ordine");
        alert("order created, redirecting....");
        this.redRoute.navigate(["home"]);
      }else{
        alert("problem with order:" + r.msg);
      }
    }
    )

  }
}