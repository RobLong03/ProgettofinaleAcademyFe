import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openHelpDialog(template: TemplateRef<any>): void {
    this.dialog.open(template, { width: '400px' });
  }

}
