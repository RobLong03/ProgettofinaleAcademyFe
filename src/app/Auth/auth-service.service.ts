import { Injectable } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedIn = false;
  private isAdmin = false;

  constructor(private sessionS: SessionStorageService) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const isLoggedInValue = this.sessionS.getItem("isLoggedIn");
    const isAdminValue = this.sessionS.getItem("isAdmin");

    this.isLoggedIn = isLoggedInValue === '1';
    this.isAdmin = isAdminValue === '1';

    console.log("Logged:", this.isLoggedIn);
    console.log("Admin:", this.isAdmin);
  }

  setLoggedIn(): void {
    this.isLoggedIn = true;
    this.sessionS.setItem('isLoggedIn', '1');
  }

  setLoggedOut(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.sessionS.setItem('isLoggedIn', '0');
    this.sessionS.setItem('isAdmin', '0');
  }

  setRoleAdmin(): void {
    this.isAdmin = true;
    this.sessionS.setItem('isAdmin', '1');
  }

  setRoleUser(): void {
    this.isAdmin = false;
    this.sessionS.setItem('isAdmin', '0');
  }

  isAuthenticated(): boolean {
    console.log("is authenticated:",this.isLoggedIn)
    return this.isLoggedIn;
  }

  isRoleAdmin(): boolean {
    return this.isAdmin;
  }


  resetAll(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  
    this.sessionS.setItem('isLoggedIn', '0');
    this.sessionS.setItem('isAdmin', '0');
  
    console.log("Auth state reset: LoggedIn = false, Admin = false");
  }
  
}
