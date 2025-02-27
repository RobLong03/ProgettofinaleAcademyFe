import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { iStorageService } from './iStorageService';
import {iGlobalUserData} from './iGlobalUserData'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements iStorageService,iGlobalUserData{

  constructor(@Inject(PLATFORM_ID) private platformId:Object) { }

  getItem(key: string): string | null {
    if(isPlatformBrowser(this.platformId))
      return localStorage.getItem(key);

    return null

  }
  setItem(key: string, value: string): void {
    if(isPlatformBrowser(this.platformId))
      return localStorage.setItem(key,value);
  }
  
  removeItem(key: string): void {
    return sessionStorage.removeItem(key);
  }
  clear(): void {
    return sessionStorage.clear();
  }

  private readonly ID_CLIENTE_KEY = 'idCliente';
  private readonly ID_CARRELLO_KEY = 'idCarrello';
  private readonly ID_WISHLIST_KEY = 'idWishList';

  // permette di impostare i valori "globali"
  setUserSession(idCliente: string, idCarrello: string, idWishList: string): void {
    this.setItem(this.ID_CLIENTE_KEY, idCliente);
    this.setItem(this.ID_CARRELLO_KEY, idCarrello);
    this.setItem(this.ID_WISHLIST_KEY, idWishList);
  }

  get idCliente(): string | null {
    return this.getItem(this.ID_CLIENTE_KEY);
  }

  get idCarrelloCliente(): string | null {
    return this.getItem(this.ID_CARRELLO_KEY);
  }

  get idWishListCliente(): string | null {
    return this.getItem(this.ID_WISHLIST_KEY);
  }

  clearSession(): void {
    console.log("clear session")
    this.setItem(this.ID_CLIENTE_KEY, "");
    this.setItem(this.ID_CARRELLO_KEY, "");
    this.setItem(this.ID_WISHLIST_KEY, "");
  }

}
