import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { OrderService } from '../../../services/order/order.service';
import { OrderItemService } from '../../../services/order/order-item.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDeleteConfirmComponent } from '../../../Dialogs/order/order-delete-confirm/order-delete-confirm.component';
import { ItemfromOrderDeleteConfirmComponent } from '../../../Dialogs/order/itemfrom-order-delete-confirm/itemfrom-order-delete-confirm.component';

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
              public dialog : MatDialog
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
      alert("errore nella cancelazione:"+r.msg)

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
  })
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
        alert("errore nella cancelazione:"+r.msg)
      }
    });
  }


  openChangeAddress(currentAddressID:number) {
    throw new Error('Method not implemented.');
    }



}
