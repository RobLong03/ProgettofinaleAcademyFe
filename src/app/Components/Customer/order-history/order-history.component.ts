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
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{


  customerId:number;
  orderList:any;

  constructor(userValues : SessionStorageService,
              private orderService : OrderService,
              private orderItemsService : OrderItemService,
              public dialog : MatDialog,
              private snackbar : MatSnackBar,
              private addressService:AddressService
  ){
    this.customerId = Number.parseInt(userValues.idCliente!);
  }

  ngOnInit(){
    this.loadOrders();
  }

  private loadOrders() {
    this.orderList =[];
    this.orderService.listByCustomer(this.customerId).subscribe((r:any)=>
      {
        this.orderList = r.dati.sort((a: any, b: any) => a.id - b.id)
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
  this.orderItemsService.deleteOrderItme({
    id : delItemId
  }).subscribe((r:any)=>
  {
    console.log(r);
    if(r.rc){
      this.loadOrders();
    }else{
      this.snackbar.open("errore nella cancelazione:"+r.msg)

    }
  }
  )
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


  deleteOrder(delOrderID: number) {
    console.log(`Deleting order with id ${delOrderID}`);
    this.orderService.deleteOrder({
      id:delOrderID
    }).subscribe((r:any)=>
    {
      console.log(r);
      if(r.rc === true){
        this.loadOrders();
      }else if (r.rc === false){
        this.snackbar.open("errore nella cancelazione:"+r.msg)
      }
    });
  }


  openChangeAddress(currentAddressID:number, orderId:number) {
    

    this.addressService.listAddressByCustomer(this.customerId).subscribe((r:any)=>
    {
      if(r.rc){
        this.loadAddressChabngeDialog(r.dati,currentAddressID,orderId);
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
            this.changeAddress(orderId, r,);
          }
        })

      }
    }

    private changeAddress(orderId:number, addressId:number ){

      this.orderService.updateOrder({
        id       : orderId,
        addressId : addressId
      }).subscribe((r:any)=>{
        if(r.rc){
          this.snackbar.open("Indirizzo aggiornato con succcesso");
          this.loadOrders();
        }else{
          this.snackbar.open("Errore nel aggiornamento del del indrizzo:"+r.msg);
        }
      })

    }


  }



