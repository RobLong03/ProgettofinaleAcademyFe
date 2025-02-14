import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class FooterComponent {

}
