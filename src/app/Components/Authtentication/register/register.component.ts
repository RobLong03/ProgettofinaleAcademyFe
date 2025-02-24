import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  customerForm!: FormGroup;

  constructor(private custmS:CustomerService) { }
    
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
      console.log("Le password inserite non corrispondono!!");
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
        
        console.log("Registrazione effetuata con successo");
        this.customerForm.reset();
        //aggiungere eventuale redirect alla pagina utente
      } else {

        console.log(resp.msg);
      }
    });
  }
}
