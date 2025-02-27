import { Injectable } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInAdmin = false;
  private isLoggedInCustomer = false;

  constructor(private sessionS: SessionStorageService) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const isLoggedInAdminValue = this.sessionS.getItem("isLoggedInAdmin");
    const isLoggedInCustomerValue = this.sessionS.getItem("isLoggedInCustomer");

    this.isLoggedInAdmin = isLoggedInAdminValue === '1';
    this.isLoggedInCustomer = isLoggedInCustomerValue === '1';

    console.log("Admin Logged:", this.isLoggedInAdmin);
    console.log("Customer Logged:", this.isLoggedInCustomer);
  }

  setLoggedInAdmin(): void {
    this.isLoggedInAdmin = true;
    this.isLoggedInCustomer = false;
    this.sessionS.setItem('isLoggedInAdmin', '1');
    this.sessionS.setItem('isLoggedInCustomer', '0');
  }

  setLoggedInCustomer(): void {
    this.isLoggedInCustomer = true;
    this.isLoggedInAdmin = false;
    this.sessionS.setItem('isLoggedInCustomer', '1');
    this.sessionS.setItem('isLoggedInAdmin', '0');
  }

  setLoggedOut(): void {
    this.isLoggedInAdmin = false;
    this.isLoggedInCustomer = false;
    this.sessionS.setItem('isLoggedInAdmin', '0');
    this.sessionS.setItem('isLoggedInCustomer', '0');
    this.sessionS.clearSession();
  }

  isAuthenticatedAdmin(): boolean {
    console.log("is authenticated admin:", this.isLoggedInAdmin);
    return this.isLoggedInAdmin;
  }

  isAuthenticatedCustomer(): boolean {
    console.log("is authenticated customer:", this.isLoggedInCustomer);
    return this.isLoggedInCustomer;
  }

  resetAll(): void {
    this.isLoggedInAdmin = false;
    this.isLoggedInCustomer = false;
  
    this.sessionS.setItem('isLoggedInAdmin', '0');
    this.sessionS.setItem('isLoggedInCustomer', '0');

    this.sessionS.clearSession();
  
    console.log("Auth state reset: Admin = false, Customer = false");
  }
}