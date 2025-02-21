import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { AddressService } from '../../../services/customer/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  protected addresses:any;
  protected customerId:number;

  constructor(
      private userValues : SessionStorageService,
      private addressS : AddressService
  ){
    this.customerId = parseInt(this.userValues.idCliente!);
  }
  ngOnInit(): void {
    this.addressS.getAddress()
  }


}
