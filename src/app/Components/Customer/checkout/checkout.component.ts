import { CustomerService } from './../../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AddressService } from '../../../services/customer/address.service';
import { CartItemService } from '../../../services/cart/cart-item.service';
import { ProductService } from '../../../services/products/product.service';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewAddressDialogComponent } from '../../../Dialogs/address/new-address-dialog/new-address-dialog.component';
import { RemoveItemComponent } from '../../../Dialogs/checkout/remove-item/remove-item.component';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  customerId: number;
  cartId: number;
  addresses: any[] = [];
  selectedAddress: any;
  itemsFromCart: any[] = [];
  orderItems: any[] = [];
  paymentMethod: string = 'cash'; // Default payment method
  totalprice: number = 0;

  constructor(
    private userValues: SessionStorageService,
    private addressS: AddressService,
    private cartitemS: CartItemService,
    private productS: ProductService,
    private orderS: OrderService,
    private redRoute: Router,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private custS:CustomerService
  ) {
    this.customerId = parseInt(this.userValues.idCliente!);
    this.cartId = parseInt(this.userValues.idCarrelloCliente!);
  }

  ngOnInit(): void {
    this.orderItems = [];
    if (this.customerId) this.fetchAddresses();
    if (this.cartId) this.fetchCartItems(this.cartId);
  }

  // Metodo per ottenere gli indirizzi del cliente
  private fetchAddresses(): void {
    this.addressS.listAddressByCustomer(this.customerId).subscribe({
      next: (resp: any) => {
        this.addresses = resp.dati;
        if (this.addresses.length === 0) {
          this.snackbar.open("Non hai alcun indirizzo salvato, perfavore creane uno");
        }
      },
      error: (err) => {
        console.error("Error fetching addresses:", err);
        this.snackbar.open("Errore nel recupero degli indirizzi");
      }
    });
  }

  // Metodo per ottenere gli articoli del carrello
  private fetchCartItems(cartId: number): void {
    this.cartitemS.listByCart(cartId).subscribe({
      next: (resp: any) => {
        this.itemsFromCart = resp.dati;
        if (this.itemsFromCart.length > 0) {
          this.fetchOtherItemData(); // Chiama fetchOtherItemData() se ci sono articoli nel carrello
        } else {
          this.handleEmptyCart(); // Chiama handleEmptyCart() se il carrello è vuoto
        }
      },
      error: (err) => {
        console.error("Error fetching cart items:", err);
        this.snackbar.open("Errore nel recupero degli articoli del carrello");
      }
    });
  }

  // Metodo per ottenere i dati aggiuntivi degli articoli nel carrello
  private fetchOtherItemData(): void {
    this.orderItems = [];
    this.totalprice = 0;
    for (let cartItem of this.itemsFromCart) {
      this.productS.getProduct(cartItem.productId).subscribe({
        next: (resp: any) => {
          const combinedItem = {
            ...resp.dati,
            cartItemId: cartItem.id,
            cartId: cartItem.cartId,
            quantity: cartItem.quantity,
          };
          this.totalprice += combinedItem.price * combinedItem.quantity;
          this.orderItems.push(combinedItem);
        },
        error: (err) => {
          console.error("Error fetching product data:", err);
          this.snackbar.open("Errore nel recupero dei dati del prodotto");
        }
      });
    }
  }

  // Metodo per gestire il caso in cui il carrello è vuoto
  private handleEmptyCart(): void {
    console.log("Il tuo carrello è vuoto, aggiungi qualcosa al carrello per continuare");
    this.snackbar.open("Il tuo carrello è vuoto, aggiungi qualcosa al carrello per continuare", '', {
      duration: 3000
    });
    setTimeout(() => {
      this.redRoute.navigate(["home"]);
    }, 3000);
  }

  // Metodo per cambiare l'indirizzo selezionato
  onAddressChange(addressId: number): void {
    this.selectedAddress = this.addresses.find((addr: any) => addr.id === addressId);
  }

  // Metodo per cambiare il metodo di pagamento selezionato
  onPaymentMethodChange(event: any): void {
    this.paymentMethod = event.value;
  }

  // Metodo per aprire il dialogo di conferma rimozione articolo
  openDeleteItemDialog(itemToRemove: any): void {
    const deleteOrderitemDialog = this.dialog.open(RemoveItemComponent, {
      data: {
        brand: itemToRemove.brand,
        model: itemToRemove.model,
        maxQuantity: itemToRemove.quantity
      }
    });

    deleteOrderitemDialog.afterClosed().subscribe(result => {
      if (result !== "false") {
        this.removeOrderItems(itemToRemove, result); // Chiama removeOrderItems() se l'utente conferma la rimozione
      }
    });
  }

  // Metodo per rimuovere articoli dall'ordine
  private removeOrderItems(item: any, quantityToRemove: number): void {
    this.cartitemS.removeItemsCart({
      id: item.cartItemId,
      productId: item.id,
      cartId: item.cartId,
      quantity: quantityToRemove,
    }).subscribe({
      next: () => this.fetchCartItems(item.cartId), // Chiama fetchCartItems() per aggiornare il carrello
      error: (err) => {
        console.error("Error removing item from cart:", err);
        this.snackbar.open("Errore nella rimozione dell'articolo:" + err.msg);
      }
    });
  }

  // Metodo per inviare l'odine
  onSubmit(): void {
    this.orderS.createOrder({
      customerId: this.customerId,
      addressId: this.selectedAddress.id
    }).subscribe({
      next: (r: any) => {
        if (r.rc) {
          this.snackbar.open("Ordine creato, reindirizzamento in corso...", '', {
            duration: 2500
          });


      this.EmailSender(this.customerId);




          setTimeout(() => {
            this.redRoute.navigate(["@me/orders"]);
          }, 3000);
        } else {
          this.snackbar.open("Problema con l'ordine: " + r.msg, '', {
            duration: 2000
          });
        }
      },
      error: (err) => {
        console.error("Error creating order:", err);
        this.snackbar.open("Errore nella creazione dell'ordine");
      }
    });
  }

  // Metodo per aprire il dialogo di aggiunta nuovo indirizzo
  addNewAddress(): void {
    const newAddressDialog = this.dialog.open(NewAddressDialogComponent);

    newAddressDialog.afterClosed().subscribe(result => {
      if (result !== "false" && result !== false) {
        this.createAddress(result); // Chiama createAddress() se l'utente conferma l'aggiunta
      }
    });
  }

  // Metodo per creare un nuovo indirizzo
  private createAddress(addr: any): void {
    this.addressS.createAddress({
      customerID: this.customerId,
      country: addr.country,
      city: addr.city,
      postalCode: addr.postalCode,
      street: addr.street,
      houseNumber: addr.houseNumber
    }).subscribe({
      next: (r: any) => {
        if (r.rc) {
          this.fetchAddresses(); // Chiama fetchAddresses() per aggiornare la lista degli indirizzi
        } else {
          this.snackbar.open("Errore nell'aggiunta dell'indirizzo: " + r.msg);
        }
      },
      error: (err) => {
        console.error("Error creating address:", err);
        this.snackbar.open("Errore nella creazione dell'indirizzo");
      }
    });
  }
  private EmailSender(customerId:number) {
    let dettagliProdotti = '';
    this.orderItems.forEach((prodotto: { nome: any; quantita: number; prezzo: number; }) => {
  dettagliProdotti += `${prodotto.nome} x ${prodotto.quantita} = €${(prodotto.prezzo * prodotto.quantita).toFixed(2)}\n`;
});

    this.custS.getCustomer(customerId).subscribe((x: any) => {
      console.log(x);
      emailjs.send(
        "service_sq6mmfs",
        "template_clitmec",
        {
          ...x, // spread customer data into the template parameters if needed
          to_name: x.dati.email,
          from_name: "DDDR Techzone",
          dettagli_prodotti: dettagliProdotti,
          // add other parameters as required
        },
        "OnWFkHV1CAcfM8QBv"
      );
    });
  }
}
