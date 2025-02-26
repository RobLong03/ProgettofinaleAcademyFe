import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AddressService } from '../../../services/customer/address.service';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { ProductService } from '../../../services/products/product.service';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RemoveItemComponent } from '../../../Dialogs/checkout/remove-item/remove-item.component';
import { query } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewAddressDialogComponent } from '../../../Dialogs/address/new-address-dialog/new-address-dialog.component';

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
    private redRoute: Router,
    public dialog : MatDialog,
    private snackbar : MatSnackBar
    
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.cartId = parseInt(this.userValues.idCarrelloCliente!);
  }

  ngOnInit(): void {
    this.orderItems = [];
    if (this.customerId)
      this.fetchAddresses();

    if (this.cartId)
      this.fetchCartItems(this.cartId);
  }

  private fetchAddresses() {
    this.addressS.listAddressByCustomer(this.customerId).subscribe((resp:any) => {
      this.addresses = resp.dati;
      if(this.addresses.lenghth == 0){
        this.snackbar.open("Non hai alcun indirizzo salvato, perfavore creane uno")
      }
    });
  }

  private fetchCartItems(cart: number) {
    this.cartitemS.listByCart(cart).subscribe((resp:any) => {
      this.itemsFromCart = resp.dati;
      console.log(this.itemsFromCart.length > 0)
      if( this.itemsFromCart.length > 0 ){
        this.fetchOtherItemData();
      }else{
        console.log("il tuo carello é vuoto, aggiungi qualcosa al carello per continuare")
        this.snackbar.open("il tuo carello é vuoto, aggiungi qualcosa al carello per continuare", ''  , {
          duration: 3000
        });
        setTimeout(() => {
          this.redRoute.navigate(["home"]);
        }, 3000)
      }

      
    });
  }

  private fetchOtherItemData() {
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

  openDeleteItemDialog(itemToRemove:any) {

    console.log("Removing items from cart:",itemToRemove);
    console.log("Cart Item ID:", itemToRemove.cartItemId);
    console.log("Product ID:", itemToRemove.id);

   let deleteOrderitemDialog = this.dialog.open(RemoveItemComponent,{
    data : {
      brand        : itemToRemove.brand,
      model        : itemToRemove.model,
      maxQuantity  : itemToRemove.quantity
    }
   });

   deleteOrderitemDialog.afterClosed().subscribe(result => {
    if(result !="false"){
      let qtyToRemove = result;
      console.log(qtyToRemove);


      this.removeOrderItems(itemToRemove,qtyToRemove);
    }
  });

  }

  private removeOrderItems(item:any,quantityToRemove:number){
    console.log("item qty>0");
    this.cartitemS.removeItemsCart({
      id        :   item.cartItemId,
      productId :   item.id,
      cartId    :   item.cartId,
      quantity  :   quantityToRemove,
    }).subscribe((r:any)=>{
      if(r)
        this.fetchCartItems(item.cartId);
      else
      this.snackbar.open("theres been a problem deleting the item:"+r.msg)
    }
   )
  }

  onSubmit() {
    console.log("Saving order....");

    this.orderS.createOrder({
      addressId : this.selectedAddress.id,
      customerId: this.customerId
    }).subscribe((r:any)=>
    {
      console.log(r)
      if(r.rc == true || r.rc == "true"){
        console.log("completato l'ordine");
        this.snackbar.open("order created, redirecting....", ''  , {
          duration: 2500
        });
        setTimeout(() => {
          this.redRoute.navigate(["customer/c/orders"]);
        }, 3000)
        
      }else{
        this.snackbar.open("problem with order:" + r.msg, ''  , {
          duration: 2000
        });
      }
    }
    )

  }

  addNewAddress() {
    let newAddressDialog = this.dialog.open(NewAddressDialogComponent);

    newAddressDialog.afterClosed().subscribe((r)=>{
      if(r!="false" && r!=false){
        this.createAddress(r);
      }
    })

  }
  private createAddress(addr: any) {
    this.addressS.createAddress({
      customerID : this.customerId,
      country : addr.country,
      city : addr.city,
      postalCode: addr.postalCode,
      street: addr.street,
      houseNumber : addr.houseNumber
    }).subscribe((r:any)=>{

      if(r.rc){
        this.fetchAddresses();
      }else{
        this.snackbar.open("Errore nel aggiunta del indirizzo:"+r.msg);
      }

    })
  }


}