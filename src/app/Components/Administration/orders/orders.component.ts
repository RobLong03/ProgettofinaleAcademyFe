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



searchType!:string;
searched: boolean = false;
orderList:any;
currentCustomerID:number = 0;

  constructor(userValues : SessionStorageService,
              private orderService : OrderService,
              private orderItemsService : OrderItemService,
              public dialog : MatDialog,
              private snackbar : MatSnackBar,
              private addressService:AddressService,
              private customerService: CustomerService
  ){
  }

  onGoBackClick() {
    this.orderList =[];
    this.searched = false;
    this.searchType = ' ';
    this.currentCustomerID = 0;

  }

swtichUserSearchMode($event: MatRadioChange) {
this.searchType = $event.value;
}

onSubmit(searchForm: NgForm) {
  if(this.searchType == 'id'){
    const userID  = Number.parseInt(searchForm.form.get('userID')?.getRawValue())
    if(userID){
      this.searchById(userID);
    }
  }else if(this.searchType == 'email'){
    const userEmail  = searchForm.form.get('userEmail')?.getRawValue();
    console.log(userEmail);
    this.emailToId(userEmail);
  }
}

private emailToId(userEmail:string){
  this.customerService.getCustomerids({
    email:userEmail
  }).subscribe((r:any)=>
  {
    if(!r.rc){
      alert("non è stato possibile trovare il cliente dal email: "+r.msg)
    }else{
      this.currentCustomerID = r.dati.customerId;
      this.searchById(r.dati.customerId);
    }
  })
}

private searchById(userID:number){
  console.log("searching by id;",userID)
  this.orderList = [];
  this.orderService.listByCustomer(userID).subscribe((r:any)=>
  {
    console.log(r);
    if(r.rc){

      if(r.dati.length == 0){
        alert("Non sono stati trovati ordini, o il cliente non ne ha fatti o l'id non è coretto ")
      }else{
        this.orderList = r.dati;
        this.searched = true;
        this.currentCustomerID = userID;
      }

    }else{
      alert("c'è stato un errore:"+r.msg)
    }
  })

}

//ORDER LIST AND MANAGEMENT

deleteOrder(delOrderID:number) {
  console.log(`Deleting order with id ${delOrderID}`);
  this.orderService.deleteOrder({
    id:delOrderID
  }).subscribe((r:any)=>
  {
    console.log(r);
    if(r.rc === true){
      this.searchById(this.currentCustomerID);
    }else if (r.rc === false){
      this.snackbar.open("errore nella cancelazione:"+r.msg)
    }
  });
}

openDeleteOrderDialog(delOrderID:number) {
  let deleteOrderDialog = this.dialog.open(OrderDeleteConfirmComponent,
    {
      data : {orderId : delOrderID }
    }
  );

  deleteOrderDialog.afterClosed().subscribe(result => {
    if(result == "true"){
      this.deleteOrder(delOrderID);
    }else{
      console.log("his life is spared")
    }
  });

}

openChangeAddress(currentAddressID:number, orderId:number) {
    

  this.addressService.listAddressByCustomer(this.currentCustomerID).subscribe((r:any)=>
  {
    if(r.rc){
      this.loadAddressChabngeDialog(r.dati, currentAddressID, orderId);
    }else{
      this.snackbar.open("non é stato possibile caricare gli indirizzi")
    }
   });

  
   
  }

  private loadAddressChabngeDialog(addresesList:any, currentAddressID:number, orderId:number ){
    if(addresesList.length<=1){
      this.snackbar.open("Non ci sono altri indirizzi sul tuo profilo, aggiungine prima");
    }else{
      let deleteOrderitemDialog = this.dialog.open(ChangeShippingAddressComponent , {
        data: {
          addresses : addresesList,
          currentAddressId : currentAddressID
        }
      });

      deleteOrderitemDialog.afterClosed().subscribe(r=>{
        if(r!="false"){
          this.changeAddress(orderId, r);
        }
      })

    }
  }

  private changeAddress(orderId:number, addressId:number){

    this.orderService.updateOrder({
      id       : orderId,
      addressId : addressId
    }).subscribe((r:any)=>{
      if(r.rc){
        this.snackbar.open("Indirizzo aggiornato con succcesso");
        this.searchById(this.currentCustomerID);
      }else{
        this.snackbar.open("Errore nel aggiornamento del del indrizzo:"+r.msg);
      }
    })

  }

  openDeleteItemDialog(orderId:number, delItemID:number, delItemBrand:string, delItemModel:string) {
    let deleteOrderitemDialog = this.dialog.open(ItemfromOrderDeleteConfirmComponent,
      {
        data : {
          orderId : orderId,
          brand : delItemBrand,
          model :delItemModel
         }
      }
    );
  
    deleteOrderitemDialog.afterClosed().subscribe(result=>{
      if(result == "true"){
        this.deleteItemFromOrder(delItemID);
      }
    })
  
  }

  private deleteItemFromOrder(delItemId:number){
    this.orderItemsService.deleteOrderItem({
      id : delItemId
    }).subscribe((r:any)=>
    {
      console.log(r);
      if(r.rc){
        this.searchById(this.currentCustomerID);
      }else{
        this.snackbar.open("errore nella cancelazione:"+r.msg)
  
      }
    }
    )
  }

  openChangeOrderState(orderID: number, currentStatus: String) {
    let changeStatusDialog = this.dialog.open(ChangeStatusDialogComponent,
      {
        data : {
          currentStatus : currentStatus
         }
      }
    );

    changeStatusDialog.afterClosed().subscribe((r)=>{
      if((r!=false && r!=currentStatus && r!="false")){
        this.changeStatus(orderID,r);
      }
    })

  }
  
  private changeStatus(orderID:number,status:string){
    this.orderService.updateOrderStatus({
      id:orderID,
      status:status
    }).subscribe((r:any)=>{
      this.searchById(this.currentCustomerID);
    })
  }

}
