import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrl: './remove-item.component.css'
})
export class RemoveItemComponent {
qtyToRemove: number;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
    this.qtyToRemove = this.data.maxQuantity; // Initialize quantityToRemove
  }


}
