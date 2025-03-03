import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { atLeastOneValidator } from '../../utils/validators/atLeasOneFieldValidator';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  helpForm: FormGroup;
  EMAIL_API_KEY_DANIEL = "0wjANxEkPV4NCu0U2"

  constructor(private fb: FormBuilder,    private dialogRef: MatDialogRef<HelpComponent>
  ) {
    this.helpForm = this.fb.group({
      ticket_name: ['', Validators.required],
      ticket_email: [''],
      ticket_phone: [''],
      message: ['', Validators.required]
    }, { validator: atLeastOneValidator('ticket_email', 'ticket_phone') });
  }

  onSubmit() {
    if (this.helpForm.valid) {
      console.log(this.helpForm)

      emailjs.send("service_dphaxe9","template_2q74gie",{
        ticket_name: this.helpForm.value.ticket_name,
        ticket_email: this.helpForm.value.ticket_email,
        ticket_phone: this.helpForm.value.ticket_phone,
        message: this.helpForm.value.message,
        },
        this.EMAIL_API_KEY_DANIEL
      );

      this.dialogRef.close();

    }
  }
}