import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-address-confirm-dialog',
  templateUrl: './delete-address-confirm-dialog.component.html',
  styleUrl: './delete-address-confirm-dialog.component.css'
})
export class DeleteAddressConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  }
}
