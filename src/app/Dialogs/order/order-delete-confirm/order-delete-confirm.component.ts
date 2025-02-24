import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-delete-confirm',
  templateUrl: './order-delete-confirm.component.html',
  styleUrl: './order-delete-confirm.component.css'
})
export class OrderDeleteConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  }
}
