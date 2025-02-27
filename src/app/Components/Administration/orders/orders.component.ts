import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { OrderService } from '../../../services/order/order.service';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { OrderItemService } from '../../../services/order/order-item.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from '../../../services/customer/address.service';
import { OrderDeleteConfirmComponent } from '../../../Dialogs/order/order-delete-confirm/order-delete-confirm.component';
import { ChangeShippingAddressComponent } from '../../../Dialogs/order/change-shipping-address/change-shipping-address.component';
import { ItemfromOrderDeleteConfirmComponent } from '../../../Dialogs/order/itemfrom-order-delete-confirm/itemfrom-order-delete-confirm.component';
import { CustomerService } from '../../../services/customer/customer.service';
import { ChangeStatusDialogComponent } from '../../../Dialogs/order/change-status-dialog/change-status-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  searchType!: string;
  searched: boolean = false;
  orderList: any;
  currentCustomerID: number = 0;

  constructor(
    private userValues: SessionStorageService,
    private orderService: OrderService,
    private orderItemsService: OrderItemService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private addressService: AddressService,
    private customerService: CustomerService
  ) {}

  // Metodo per resettare la ricerca
  private resetSearch() {
    this.orderList = [];
    this.searched = false;
    this.searchType = '';
    this.currentCustomerID = 0;
  }

  // Metodo per gestire il click sul pulsante "Indietro"
  onGoBackClick() {
    this.resetSearch();
  }

  // Metodo per cambiare la modalità di ricerca dell'utente
  switchUserSearchMode($event: MatRadioChange) {
    this.searchType = $event.value;
  }

  // Metodo per gestire l'invio del form di ricerca
  onSubmit(searchForm: NgForm) {
    if (this.searchType === 'id') {
      const userID = Number.parseInt(searchForm.form.get('userID')?.getRawValue());
      if (userID) {
        this.searchById(userID);
      }
    } else if (this.searchType === 'email') {
      const userEmail = searchForm.form.get('userEmail')?.getRawValue();
      this.emailToId(userEmail);
    }
  }

  // Metodo per convertire l'email dell'utente in ID
  private emailToId(userEmail: string) {
    this.customerService.getCustomerids({ email: userEmail }).subscribe((r: any) => {
      if (!r.rc) {
        this.snackbar.open(`Non è stato possibile trovare il cliente dal email: ${r.msg}`);
      } else {
        this.currentCustomerID = r.dati.customerId;
        this.searchById(r.dati.customerId);
      }
    });
  }

  // Metodo per cercare ordini per ID cliente
  private searchById(userID: number) {
    this.orderList = [];
    this.orderService.listByCustomer(userID).subscribe((r: any) => {
      if (r.rc) {
        if (r.dati.length === 0) {
          this.snackbar.open("Non sono stati trovati ordini, o il cliente non ne ha fatti o l'id non è corretto");
        } else {
          this.orderList = r.dati;
          this.searched = true;
          this.currentCustomerID = userID;
        }
      } else {
        this.snackbar.open(`C'è stato un errore: ${r.msg}`);
      }
    });
  }

  // Metodo per aprire il dialogo di conferma cancellazione ordine
  openDeleteOrderDialog(delOrderID: number) {
    const deleteOrderDialog = this.dialog.open(OrderDeleteConfirmComponent, {
      data: { orderId: delOrderID }
    });

    deleteOrderDialog.afterClosed().subscribe(result => {
      if (result === "true") {
        this.deleteOrder(delOrderID);
      }
    });
  }

  // Metodo per cancellare un ordine
  private deleteOrder(delOrderID: number) {
    this.orderService.deleteOrder({ id: delOrderID }).subscribe((r: any) => {
      if (r.rc === true) {
        this.searchById(this.currentCustomerID);
      } else if (r.rc === false) {
        this.snackbar.open(`Errore nella cancellazione: ${r.msg}`);
      }
    });
  }

  // Metodo per aprire il dialogo di cambio indirizzo
  openChangeAddress(currentAddressID: number, orderId: number) {
    this.addressService.listAddressByCustomer(this.currentCustomerID).subscribe((r: any) => {
      if (r.rc) {
        this.loadAddressChangeDialog(r.dati, currentAddressID, orderId);
      } else {
        this.snackbar.open("Non è stato possibile caricare gli indirizzi");
      }
    });
  }

  // Metodo per caricare il dialogo di cambio indirizzo
  private loadAddressChangeDialog(addressesList: any, currentAddressID: number, orderId: number) {
    if (addressesList.length <= 1) {
      this.snackbar.open("Non ci sono altri indirizzi sul tuo profilo, aggiungine prima");
    } else {
      const changeAddressDialog = this.dialog.open(ChangeShippingAddressComponent, {
        data: {
          addresses: addressesList,
          currentAddressId: currentAddressID
        }
      });

      changeAddressDialog.afterClosed().subscribe(r => {
        if (r !== "false") {
          this.changeAddress(orderId, r);
        }
      });
    }
  }

  // Metodo per cambiare l'indirizzo di un ordine
  private changeAddress(orderId: number, addressId: number) {
    this.orderService.updateOrder({ id: orderId, addressId: addressId }).subscribe((r: any) => {
      if (r.rc) {
        this.snackbar.open("Indirizzo aggiornato con successo");
        this.searchById(this.currentCustomerID);
      } else {
        this.snackbar.open(`Errore nell'aggiornamento dell'indirizzo: ${r.msg}`);
      }
    });
  }

  // Metodo per aprire il dialogo di conferma cancellazione articolo da ordine
  openDeleteItemDialog(orderId: number, delItemID: number, delItemBrand: string, delItemModel: string) {
    const deleteOrderItemDialog = this.dialog.open(ItemfromOrderDeleteConfirmComponent, {
      data: {
        orderId: orderId,
        brand: delItemBrand,
        model: delItemModel
      }
    });

    deleteOrderItemDialog.afterClosed().subscribe(result => {
      if (result === "true") {
        this.deleteItemFromOrder(delItemID);
      }
    });
  }

  // Metodo per cancellare un articolo da un ordine
  private deleteItemFromOrder(delItemId: number) {
    this.orderItemsService.deleteOrderItem({ id: delItemId }).subscribe((r: any) => {
      if (r.rc) {
        this.searchById(this.currentCustomerID);
      } else {
        this.snackbar.open(`Errore nella cancellazione: ${r.msg}`);
      }
    });
  }

  // Metodo per aprire il dialogo di cambio stato ordine
  openChangeOrderState(orderID: number, currentStatus: string) {
    const changeStatusDialog = this.dialog.open(ChangeStatusDialogComponent, {
      data: { currentStatus: currentStatus }
    });

    changeStatusDialog.afterClosed().subscribe(r => {
      if (r !== false && r !== currentStatus && r !== "false") {
        this.changeStatus(orderID, r);
      }
    });
  }

  // Metodo per cambiare lo stato di un ordine
  private changeStatus(orderID: number, status: string) {
    this.orderService.updateOrderStatus({ id: orderID, status: status }).subscribe(() => {
      this.searchById(this.currentCustomerID);
    });
  }
}