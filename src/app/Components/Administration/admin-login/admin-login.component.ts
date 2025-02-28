import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { Router } from '@angular/router';
import { AdministratorService } from '../../../services/administrator/administrator.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  response: any;
  logged: boolean = false;

  constructor(private fb: FormBuilder,
              private adminS : AdministratorService,
              private authS : AuthServiceService,
              private redRouter: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]] //TODO mettiamo validator per garantire una password decente
    });
  }

  onSubmit() {
    console.log("login clicked")
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      
      
      this.adminS.signInAdmin({
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password
      }).subscribe((rsp:any)=>{
        console.log(rsp.logged);
        this.response = rsp;
        this.logged = rsp.logged;

        if(this.logged){
          this.setLoggeduser();
          setTimeout(() => {
            this.redRouter.navigate(["admin"]).then(() => {
              location.reload();
            });
          }, 1000);
        }else{
          this.authS.resetAll();
          this.loginForm.reset();
        }
        
      });
    } else {
      console.log('Form non valido');
      this.loginForm.reset();
    }
  }

  setLoggeduser(){
    this.authS.setLoggedInAdmin();
  }



}
