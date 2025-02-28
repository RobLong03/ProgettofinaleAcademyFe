import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { NewAddressDialogComponent } from '../../../Dialogs/address/new-address-dialog/new-address-dialog.component';
import { AddressService } from '../../../services/customer/address.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  customerForm!: FormGroup;

  constructor(private custmS:CustomerService,
                  public dialog : MatDialog,
                  private addresS: AddressService,
                  private redRoute : Router,
                  private snackbar : MatSnackBar
  ) { }
    
  ngOnInit(): void {
      
    this.customerForm=new FormGroup({

      name:new FormControl(null, Validators.required),
      surname:new FormControl(null, Validators.required),
      taxId:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, Validators.required), //costruire eventiuale validator per password(angular non lo fornisce)
      confirmPassword:new FormControl(null, Validators.required)
    });
  }

  sendDataCheck() {

    let password=this.customerForm.value.password;
    let confirmPassword=this.customerForm.value.confirmPassword;

    if(password===confirmPassword) {

      this.sendData();
    } else {
      this.snackbar.open('le password inserite non corrispondono','', { duration: 1500 });

    }
  }

  sendData() {

    this.custmS.createCustomer({
      name:this.customerForm.value.name,
      surname:this.customerForm.value.surname,
      taxId:this.customerForm.value.taxId,
      email:this.customerForm.value.email,
      password:this.customerForm.value.password
    })
    .subscribe((resp:any) => {

      if(resp.rc) {
        
        this.snackbar.open('Registrazione effettuata con successo','', { duration: 950 });

        this.createAddressDialog(this.customerForm.value.email);
        //aggiungere eventuale redirect alla pagina utente
      } else {
        console.log(resp.msg);
      }
    });
  }

  private createAddressDialog(email: string) {
   this.custmS.getCustomerids({email:email}).subscribe((r:any)=>{
    if(r.rc){
      this.openDialog(r.dati.customerId);
    }else{
      alert("C'è stato un errore, per favore aggiungi un indirizzo dalla pagina di gestione del tuo profilo");
    }
   });
  }

  private openDialog(customerID:number){
    let addressDialog = this.dialog.open(NewAddressDialogComponent);
    addressDialog.afterClosed().subscribe((r)=>{
      console.log(r);
      if(r=="false"){
        alert("C'è stato un errore, per favore aggiungi un indirizzo dalla pagina di gestione del tuo profilo");
      }else{
        this.addresS.createAddress({
          customerID : customerID,
          country : r.country,
          city : r.city,
          postalCode: r.postalCode,
          street: r.street,
          houseNumber : r.houseNumber
        }).subscribe((resp:any)=>{
          console.log(resp);
          if(resp.rc){
            this.snackbar.open('Indirizzo creato con successo','', { duration: 950 });
          }else{
            alert("C'è stato un errore, per favore aggiungi un indirizzo dalla pagina di gestione del tuo profilo");
          }
          this.redRoute.navigate(["login"]);
        })
      }
    })
  }

}
