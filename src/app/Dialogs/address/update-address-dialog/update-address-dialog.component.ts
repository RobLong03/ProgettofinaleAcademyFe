import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-address-dialog',
  templateUrl: './update-address-dialog.component.html',
  styleUrl: './update-address-dialog.component.css'
})
export class UpdateAddressDialogComponent {

addressForm: FormGroup;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<UpdateAddressDialogComponent>
) {
  this.addressForm = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required]
  });

  this.addressForm.patchValue({
    country: data.address.country,
    city: data.address.city,
    postalCode: data.address.postalCode,
    street: data.address.street,
    houseNumber: data.address.houseNumber
  })
}

onConfirm(): void {
  if (this.addressForm.valid) {
    console.log(this.addressForm.value);
    this.dialogRef.close(this.addressForm.value);
  }
}


}
