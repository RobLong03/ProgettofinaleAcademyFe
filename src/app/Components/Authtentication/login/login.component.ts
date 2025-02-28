import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  response: any;
  logged: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private customerS : CustomerService,
              private authS : AuthServiceService,
              private redRouter: Router,
              private sesStorS : SessionStorageService,
              public snackbar : MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]] //TODO mettiamo validator per garantire una password decente
    });
  }

onSubmit() {
  this.isLoading = true;
  console.log("login clicked")
  if (this.loginForm.valid) {
    console.log('Login data:', this.loginForm.value);

    this.customerS.signInCustomer({
      username: this.loginForm.value.email,
      pwd: this.loginForm.value.password
    }).subscribe((rsp:any)=>{
      console.log(rsp.logged);
      this.response = rsp;
      this.logged = rsp.logged;

      if(this.logged){
        this.snackbar.open('Login Effettuato, reindirizzamento','', { duration: 950 });
        this.setLoggeduser();
        this.setGlobalParameter();
        setTimeout(() => {
          this.redRouter.navigate(["home"]).then(() => {
            location.reload();
          });
        }, 1000);
      } else {
        this.snackbar.open('Riprovare','', { duration: 950 });

        this.authS.resetAll();
        this.loginForm.reset();
        this.isLoading = false;
      }
    }, error => {
      console.error('Login error', error);
      this.isLoading = false;
    });
  } else {
    console.log('Form non valido');
    this.loginForm.reset();
  }
}
  setLoggeduser(){
    this.authS.setLoggedInCustomer();
  }

  setGlobalParameter(){
    console.log({email: this.loginForm.value.email})
    this.customerS.getCustomerids({email: this.loginForm.value.email})
    .subscribe((cIds:any)=>
    {
      if(cIds.rc == true){
        console.log(cIds)
        this.sesStorS.setUserSession(cIds.dati.customerId,cIds.dati.cartId,cIds.dati.wishListId);
      }else{
        console.log("errore nel login...");
        this.authS.resetAll()
        this.loginForm.reset();
      }
    }
    )
  }
}