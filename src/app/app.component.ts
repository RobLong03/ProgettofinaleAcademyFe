import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'ProjectBetaFE';
  admin: boolean=false;
  islogged: boolean=false;

  ngOnInit(): void {
    this.admin=Boolean(localStorage.getItem('isAdmin')) ;
    this.islogged=Boolean(localStorage.getItem('isLoggedIn')) ;
  }

}
