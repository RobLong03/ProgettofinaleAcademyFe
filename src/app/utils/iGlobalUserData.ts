export interface iGlobalUserData {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  
    // Metodi specifici per la sessione utente
    setUserSession(idCliente: string, idCarrello: string, idWishList: string): void;
    get idCliente(): string | null;
    get idCarrelloCliente(): string | null;
    get idWishListCliente(): string | null;
    clearSession(): void;
  }
  