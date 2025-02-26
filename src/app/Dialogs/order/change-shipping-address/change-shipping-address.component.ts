import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-change-shipping-address',
  templateUrl: './change-shipping-address.component.html',
  styleUrl: './change-shipping-address.component.css'
})
export class ChangeShippingAddressComponent {



newAddressId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){
    this.newAddressId = data.currentAddressId;
  }

  updateSelectedAddress(event: MatSelectChange) {
    this.newAddressId = event.value;
  }


}
