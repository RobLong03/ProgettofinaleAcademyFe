import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdProductComponent } from '../../../Dialogs/dialog/ad-product/ad-product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

isAdmin: any;

constructor(private dialog:MatDialog) {

}

onClick( ): void {
    const dialogRef = this.dialog.open(AdProductComponent, {
      width: '600px', // optional: set the desired width
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        // Optionally refresh your data or update state here
        console.log('Dialog closed, reload triggered');
      }
    });
  }


}
