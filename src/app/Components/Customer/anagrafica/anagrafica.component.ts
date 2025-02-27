import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewAddressDialogComponent } from '../../../Dialogs/address/new-address-dialog/new-address-dialog.component';
import { AddressService } from '../../../services/customer/address.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../utils/session-storage.service';
import { DeleteAddressConfirmDialogComponent } from '../../../Dialogs/address/delete-address-confirm-dialog/delete-address-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateAddressDialogComponent } from '../../../Dialogs/address/update-address-dialog/update-address-dialog.component';
import { AuthServiceService } from '../../../Auth/auth-service.service';

interface Address {
  id: number;
  customerID: number;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
}

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css'],
})
export class AnagraficaComponent implements OnInit {
  customerForm: FormGroup;
  changePassword: boolean = false;
  customerId: number;
  customerEmail: string = '';
  addresses: Address[] = [];

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private addressService: AddressService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    public snackBar: MatSnackBar,
    private authService: AuthServiceService
  ) {
    this.customerId = Number.parseInt(this.sessionStorageService.idCliente!);
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      taxId: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadAddresses();
  }

  // Carica i dati del cliente nel modulo
  private loadForm() {
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.customerEmail = response.dati.email;
          this.customerForm.patchValue({
            name: response.dati.name,
            surname: response.dati.surname,
            taxId: response.dati.taxId,
            email: response.dati.email,
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
          });
        } else {
          this.showSnackBar('Errore nel recupero dei dati del cliente');
        }
      },
      error: (err) => {
        this.handleError(err, "Errore nel caricamento del modulo cliente");
      }
    });
  }

  // Carica gli indirizzi del cliente
  private loadAddresses() {
    this.addressService.listAddressByCustomer(this.customerId).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.addresses = response.dati;
        } else {
          this.showSnackBar("C'è stato un problema con gli indirizzi, riprovare più tardi");
        }
      },
      error: (err) => {
        this.handleError(err, "Errore nel caricamento degli indirizzi");
      }
    });
  }

  // Aggiorna il flag per il cambio password
  updateChangePassword(checked: boolean) {
    this.changePassword = checked;
  }

  // Verifica i dati del modulo e invia la richiesta di aggiornamento
  sendDataCheck() {
    const currentPassword = this.customerForm.value.currentPassword;
    let flag = true;

    if (this.changePassword) {
      const newPassword = this.customerForm.value.newPassword;
      const confirmPassword = this.customerForm.value.confirmPassword;
      flag = newPassword === confirmPassword;
    }

    if (flag) {
      this.customerService.signInCustomer({
        username: this.customerEmail,
        pwd: currentPassword,
      }).subscribe({
        next: (response: any) => {
          if (response.logged) {
            this.updateCustomer();
          } else {
            this.resetPasswordFields('Password corrente sbagliata, riprovare');
          }
        },
        error: (err) => {
          this.handleError(err, "Errore nel login del cliente");
        }
      });
    } else {
      this.resetPasswordFields('La nuova password non corrisponde con il controllo');
    }
  }

  // Resetta i campi della password nel modulo
  private resetPasswordFields(msg: string) {
    this.showSnackBar(msg);
    this.customerForm.patchValue({
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    });
  }

  // Aggiorna i dati del cliente
  updateCustomer() {
    this.customerService.updateCustomer({
      id: this.customerId,
      name: this.customerForm.value.name,
      surname: this.customerForm.value.surname,
      taxId: this.customerForm.value.taxId,
      email: this.customerForm.value.email,
      password: this.changePassword ? this.customerForm.value.newPassword : '',
    }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.showSnackBar('Aggiornamento effettuato con successo');
          this.loadForm();
        } else {
          this.showSnackBar(response.msg);
        }
      },
      error: (err) => {
        this.handleError(err, "Errore nell'aggiornamento del cliente");
      }
    });
  }

  // Apre il dialog per aggiungere un nuovo indirizzo
  protected openDialog() {
    const addressDialog = this.dialog.open(NewAddressDialogComponent);
    addressDialog.afterClosed().subscribe((result) => {
      if (result == 'false') {
        this.showSnackBar("C'è stato un errore, per favore aggiungi un indirizzo dalla pagina di gestione del tuo profilo");
      } else {
        this.createAddress(result);
      }
    });
  }

  // Crea un nuovo indirizzo
  private createAddress(address: Address) {
    this.addressService.createAddress({
      customerID: this.customerId,
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      houseNumber: address.houseNumber,
    }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.showSnackBar('Indirizzo creato con successo');
          this.loadAddresses();
        } else {
          this.showSnackBar("C'è stato un errore, per favore aggiungi un indirizzo dalla pagina di gestione del tuo profilo");
        }
      },
      error: (err) => {
        this.handleError(err, "Errore nella creazione dell'indirizzo");
      }
    });
  }

  // Apre il dialog per aggiornare un indirizzo esistente
  updateAddress(address: Address) {
    const updateAddressDialog = this.dialog.open(UpdateAddressDialogComponent, {
      data: { address: address }
    });

    updateAddressDialog.afterClosed().subscribe((result) => {
      if (result != "false") {
        this.updateTheAddress(result, address.id, address.customerID);
      }
    });
  }

  // Aggiorna un indirizzo esistente
  private updateTheAddress(address: Address, id: number, customerID: number) {
    this.addressService.updateAddress({
      id: id,
      customerID: customerID,
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      houseNumber: address.houseNumber
    }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.showSnackBar("Indirizzo aggiornato");
          this.loadAddresses();
        } else {
          this.showSnackBar("Errore nell'aggiornamento: " + response.msg);
        }
      },
      error: (err) => {
        this.handleError(err, "Errore interno nell'aggiornamento");
      }
    });
  }

  // Apre il dialog per confermare la rimozione di un indirizzo
  removeAddress(address: Address) {
    const confirmRemoveDialog = this.dialog.open(DeleteAddressConfirmDialogComponent, {
      data: { address: address },
    });

    confirmRemoveDialog.afterClosed().subscribe((result) => {
      if (result != "false") {
        this.deleteAddress(address.id);
      }
    });
  }

  // Rimuove un indirizzo
  private deleteAddress(addressId: number) {
    this.addressService.deleteAddress({ id: addressId }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          this.showSnackBar("Indirizzo rimosso...");
          this.loadAddresses();
        } else {
          this.showSnackBar("Errore nella rimozione: " + response.msg);
        }
      },
      error: (err) => {
        this.handleError(err, "Errore interno nella rimozione");
      }
    });
  }

  // Gestisce gli errori e mostra un messaggio di errore
  private handleError(error: any, message: string) {
    console.error('Error', error);
    this.showSnackBar(message);
  }

  // Mostra un messaggio di notifica
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Chiudi', { duration: 3000 });
  }

  // Elimina l'account del cliente
  public deleteAccount(form: NgForm) {
    this.customerService.signInCustomer({
      username: this.customerEmail,
      pwd: form.value.passwordDelete
    }).subscribe({
      next: (response: any) => {
        this.nukeAccount();
      },
      error: (err) => {
        this.handleError(err, "Errore nel login del cliente");
      }
    });
  }

  // Cancella definitivamente l'account del cliente
  private nukeAccount() {
    this.customerService.deleteCustomer({ id: this.customerId }).subscribe({
      next: (response: any) => {
        if (response.rc) {
          alert("Account Cancellato, reindirizzamento alla home");
          this.authService.resetAll();
          this.router.navigate(["home"]);
        } else {
          alert("C'é stato un errore nella cancellazione dell'account, riprovare o contattare un amministratore");
        }
      },
      error: (err) => {
        alert("C'é stato un errore interno cancellazione dell'account, riprovare o contattare un amministratore");
      }
    });
  }
}