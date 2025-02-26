import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-address-dialog',
  templateUrl: './new-address-dialog.component.html',
  styleUrl: './new-address-dialog.component.css'
})
export class NewAddressDialogComponent {

addressForm: FormGroup;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<NewAddressDialogComponent>
) {
  this.addressForm = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required]
  });
}

onConfirm(): void {
  if (this.addressForm.valid) {
    this.dialogRef.close(this.addressForm.value);
  }
}

}
