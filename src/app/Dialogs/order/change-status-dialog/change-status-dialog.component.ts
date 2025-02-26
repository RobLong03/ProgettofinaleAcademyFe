import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-change-status-dialog',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent {


  orderStatuses = [
    "PENDING",    
    "PREPARING",    
    "SHIPPED",      
    "DELIVERED",    
    "CANCELED",     
    "RETURNED",     
    "REFUNDED"      
  ];

  statusChoices: string[];
  newStatus:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.statusChoices = [];
    this.newStatus= this.data.currentStatus;

    this.statusChoices = this.orderStatuses.filter((s)=>{
      return s!=this.data.currentStatus
    })
  }

  updateSelecteStatus($event: MatSelectChange) {
    this.newStatus = $event.value;
    }
}