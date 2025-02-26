import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'ProjectBetaFE';
  admin: boolean = false;
  islogged: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.admin = Boolean(localStorage.getItem('isAdmin'));
      this.islogged = Boolean(localStorage.getItem('isLoggedIn'));
    }
  }


}
