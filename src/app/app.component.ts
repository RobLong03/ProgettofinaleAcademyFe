import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, TemplateRef } from '@angular/core';
import { AuthServiceService } from './Auth/auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
    protected router:Router,
    private dialog: MatDialog) { }



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

  openHelpDialog(template: TemplateRef<any>): void {
    this.dialog.open(template, { width: '400px' });
  }
}
