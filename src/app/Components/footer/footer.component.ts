import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpComponent } from '../../Dialogs/help/help.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openHelpDialog(): void {
    this.dialog.open(HelpComponent);
  }

}
