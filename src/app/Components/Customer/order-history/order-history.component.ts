import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { OrderService } from '../../../services/order/order.service';
import { OrderItemService } from '../../../services/order/order-item.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderDeleteConfirmComponent } from '../../../Dialogs/order/order-delete-confirm/order-delete-confirm.component';
import { ItemfromOrderDeleteConfirmComponent } from '../../../Dialogs/order/itemfrom-order-delete-confirm/itemfrom-order-delete-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeShippingAddressComponent } from '../../../Dialogs/order/change-shipping-address/change-shipping-address.component';
import { AddressService } from '../../../services/customer/address.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  customerId: number;
  orderList: any[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private orderService: OrderService,
    private orderItemsService: OrderItemService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private addressService: AddressService
  ) {
    this.customerId = Number.parseInt(this.sessionStorageService.idCliente!);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Carica gli ordini del cliente e li ordina per ID
  private loadOrders(): void {
    this.orderService.listByCustomer(this.customerId).subscribe({
      next: (response: any) => {
        this.orderList = response.dati.sort((a: any, b: any) => a.id - b.id);
      },
      error: (error: any) => {
        this.snackbar.open('Errore nel caricamento degli ordini', 'Chiudi', { duration: 3000 });
      }
    });
  }

  // Apre il dialog per confermare la cancellazione di un articolo dall'ordine
  openDeleteItemDialog(orderId: number, delItemID: number, delItemBrand: string, delItemModel: string): void {
    const deleteOrderItemDialog = this.dialog.open(ItemfromOrderDeleteConfirmComponent, {
      data: {
        orderId: orderId,
        brand: delItemBrand,
        model: delItemModel
      }
    });

    deleteOrderItemDialog.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deleteItemFromOrder(delItemID); // Chiamata successiva
      }
    });
  }

  // Cancella un articolo dall'ordine
  private deleteItemFromOrder(delItemId: number): void {
    this.orderItemsService.deleteOrderItem({ id: delItemId }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.loadOrders(); // Ricarica gli ordini dopo la cancellazione
        } else {
          this.snackbar.open(`Errore nella cancellazione: ${response.msg}`, 'Chiudi', { duration: 3000 });
        }
      },
      error: (error: any) => {
        this.snackbar.open('Errore nella cancellazione dell\'articolo', 'Chiudi', { duration: 3000 });
      }
    });
  }

  // Apre il dialog per confermare la cancellazione di un ordine
  openDeleteOrderDialog(delOrderID: number): void {
    const deleteOrderDialog = this.dialog.open(OrderDeleteConfirmComponent, {
      data: { orderId: delOrderID }
    });

    deleteOrderDialog.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deleteOrder(delOrderID); // Chiamata successiva
      }
    });
  }

  // Cancella un ordine
  private deleteOrder(delOrderID: number): void {
    this.orderService.deleteOrder({ id: delOrderID }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.loadOrders(); // Ricarica gli ordini dopo la cancellazione
        } else {
          this.snackbar.open(`Errore nella cancellazione: ${response.msg}`, 'Chiudi', { duration: 3000 });
        }
      },
      error: (error: any) => {
        this.snackbar.open('Errore nella cancellazione dell\'ordine', 'Chiudi', { duration: 3000 });
      }
    });
  }

  // Apre il dialog per cambiare l'indirizzo di spedizione di un ordine
  openChangeAddress(currentAddressID: number, orderId: number): void {
    this.addressService.listAddressByCustomer(this.customerId).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.loadAddressChangeDialog(response.dati, currentAddressID, orderId); // Chiamata successiva
        } else {
          this.snackbar.open('Non è stato possibile caricare gli indirizzi', 'Chiudi', { duration: 3000 });
        }
      },
      error: (error: any) => {
        this.snackbar.open('Errore nel caricamento degli indirizzi', 'Chiudi', { duration: 3000 });
      }
    });
  }

  // Carica il dialog per cambiare l'indirizzo di spedizione
  private loadAddressChangeDialog(addressesList: any[], currentAddressID: number, orderId: number): void {
    if (addressesList.length <= 1) {
      this.snackbar.open('Non ci sono altri indirizzi sul tuo profilo, aggiungine prima', 'Chiudi', { duration: 3000 });
    } else {
      const changeAddressDialog = this.dialog.open(ChangeShippingAddressComponent, {
        data: {
          addresses: addressesList,
          currentAddressId: currentAddressID
        }
      });

      changeAddressDialog.afterClosed().subscribe(result => {
        if (result !== 'false') {
          this.changeAddress(orderId, result); // Chiamata successiva
        }
      });
    }
  }

  // Cambia l'indirizzo di spedizione di un ordine
  private changeAddress(orderId: number, addressId: number): void {
    this.orderService.updateOrder({ id: orderId, addressId: addressId }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.snackbar.open('Indirizzo aggiornato con successo', 'Chiudi', { duration: 3000 });
          this.loadOrders(); // Ricarica gli ordini dopo l'aggiornamento
        } else {
          this.snackbar.open(`Errore nell'aggiornamento dell'indirizzo: ${response.msg}`, 'Chiudi', { duration: 3000 });
        }
      },
      error: (error: any) => {
        this.snackbar.open('Errore nell\'aggiornamento dell\'indirizzo', 'Chiudi', { duration: 3000 });
      }
    });
  }
}