import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { OrderService } from '../../../services/order/order.service';
import { OrderItemService } from '../../../services/order/order-item.service';

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
              private orderItemsService : OrderItemService
  ){
    this.customerId = Number.parseInt(userValues.idCliente!);
  }

  ngOnInit(){
    this.orderService.listByCustomer(this.customerId).subscribe((r:any)=>
    {
      this.orderList = r.dati.sort((a: any, b: any) => a.id - b.id)
    })
  }

}
