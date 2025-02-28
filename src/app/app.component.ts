import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthServiceService } from './Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'ProjectBetaFE';
  admin: boolean = false;
  islogged: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authS:AuthServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.admin=this.authS.isAuthenticatedAdmin();
      this.islogged=this.authS.isAuthenticatedCustomer();
    }
  }

  logout() {

    this.authS.resetAll();
    this.router.navigate([''], { skipLocationChange: true }).then(() => {
      location.reload();
    });
  };
}
