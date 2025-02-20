import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  response: any;
  logged: boolean = false;

  constructor(private fb: FormBuilder,
              private customerS : CustomerService,
              private authS : AuthServiceService,
              private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]] //TODO mettiamo validator per garantire una password decente
    });
  }

  onSubmit() {
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
          this.authS.setLoggedIn();
          this.authS.setRoleUser();
          this.router.navigate(["/home"]);
        }else{
          this.authS.resetAll();
        }
        

      });
    } else {
      console.log('Form non valido');
    }
  }

}
