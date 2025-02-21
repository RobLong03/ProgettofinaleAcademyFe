import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AddressService } from '../../../services/customer/address.service';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  customerId: number;
  cartId: number;

  addresses: any;
  addressResp: any;
  selectedAddress: any;

  itemsFromCart: any;
  itemsFromCartResp: any;

  productResp:any;

  orderItems:any;

  paymentMethod: string = 'cash'; // Default payment method

  totalprice:number = 0;


  constructor(
    private userValues: SessionStorageService,
    private addressS: AddressService,
    private cartitemS : CartItemService,
    private productS : ProductService
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.cartId = parseInt(this.userValues.idCarrelloCliente!);
  }

  ngOnInit(): void {
    this.orderItems = [];
    if (this.customerId)
      this.fetchAddresses(this.customerId);

    if(this.cartId)
      this.fetchCartItems(this.cartId);

  }

  private fetchAddresses(cId: number) {
    this.addressS.listAddressByCustomer(cId).subscribe(resp => {
      this.addressResp = resp;
      this.addresses = this.addressResp.dati;
      console.log(this.addresses);
    });
  }

  private fetchCartItems(cart:number){
    this.cartitemS.getListByCart(cart).subscribe(resp=>
    {
      this.itemsFromCartResp = resp;
      this.itemsFromCart = this.itemsFromCartResp.dati;
      this.getItemsAndAsignToOrder();
    }
    );
  }

  private getItemsAndAsignToOrder(){
    this.orderItems = []; // sistemazione temporanea, da aggiornre dto e poi aggiornare questo metodo
    this.totalprice = 0;
    for(let cartItem of this.itemsFromCart){
      this.productS.getProduct(cartItem.productId).subscribe(resp=>{
        this.productResp = resp;
        const combinedItem = {
          ...this.productResp.dati, //i campi di product
          cartItemId: cartItem.id, //+ quelli di cartitem presi a mano
          cartid: cartItem.cartId,
          quantity: cartItem.quantity,
          selectedQuantityToRemove  : cartItem.quantity // Valore predefinito
        };
        this.totalprice = this.totalprice + ( combinedItem.price * combinedItem.quantity)
        this.orderItems.push(combinedItem);
      })
    }
  }

  onAddressChange(addressId: number) {
    this.selectedAddress = this.addresses.find((addr: any) => addr.id === addressId);
  }

  onPaymentMethodChange(event: any) {
    this.paymentMethod = event.value;
  }

  removeItems(item: any) {
    const quantityToRemove = item.selectedQuantityToRemove;
    ;

    if(item.quantity - quantityToRemove > 0){

      this.cartitemS.removeItemsCart({
        id        :   item.cartItemId,
        productId :   item.id,
        cartId    :   item.cartId,
        quantity  :   quantityToRemove,
      })

    }else{
      this.cartitemS.removeCartItem({
        id: item.cartItemId
      })
    }

    this.updateitemList();

    }

    updateitemList(){
      if(this.cartId)
        this.fetchCartItems(this.cartId);
    }
}