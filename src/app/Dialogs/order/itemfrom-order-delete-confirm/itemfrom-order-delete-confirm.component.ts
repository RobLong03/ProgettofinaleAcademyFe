import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-itemfrom-order-delete-confirm',
  templateUrl: './itemfrom-order-delete-confirm.component.html',
  styleUrl: './itemfrom-order-delete-confirm.component.css'
})
export class ItemfromOrderDeleteConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  }

}
