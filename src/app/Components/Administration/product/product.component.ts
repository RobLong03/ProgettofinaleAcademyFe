import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../Interfaces/Product';
import { ProductService } from '../../../services/products/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AdProductComponent } from '../../../Dialogs/dialog/ad-product/ad-product.component';
import { ProductDescriptionService } from '../../../services/products/product-description.service';



@Component({
  selector: 'app-administration-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',

})
export class ProductComponent  implements OnInit , AfterViewInit {



  productList!: Product[];
  displayedColumns: string[] = ['Model', 'Brand', 'Price', 'Type', 'Actions'];
  public dataSource!: MatTableDataSource<Product>;

  showSpinner = true;
  response: any;
  selectedSocio: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private prodS: ProductService,
    private descPS:ProductDescriptionService,
    private dialog: MatDialog,
    protected dialog2: MatDialog,

  ) {

  }

  ngOnInit(): void {
    this.LoadInitialData();
    setTimeout(() => {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, 100);

  }

  ngAfterViewInit(): void {
    // Se la dataSource è già stata inizializzata, assegna paginator e sort

      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

  }

  LoadInitialData(): void {
    this.prodS.listProduct().subscribe((x: any) => {
      this.showSpinner = false;
      this.response = x;
      this.productList = this.response.dati;
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      // Associa paginator e sort alla data source
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onClick(type: string,id?: number, ): void {
    const dialogRef = this.dialog.open(AdProductComponent, {
      width: '600px', // optional: set the desired width
      data: { id:id, type:type }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        // Optionally refresh your data or update state here
        this.LoadInitialData();

        console.log('Dialog closed, reload triggered');
      }
    });
  }

  openDialog(templateRef: TemplateRef<any>) {
    const dialogRef2 = this.dialog.open(templateRef, {
     width: '300px'
   });
   dialogRef2.afterClosed().subscribe(result => {
    if (result === 'reload') {
      // Optionally refresh your data or update state here
      this.LoadInitialData();
    }
  });
  }
  onDelete(id: number) {
    if (!id) throw new Error("Invalid ID");

    this.prodS.getProduct(id).subscribe((x: any) => {
      const prod: Product = x.dati;
      console.log(prod);
      if (prod.description) {
        // Delete the description first
        this.descPS.deleteAllDescription({ idprodotto: id }).subscribe(() => {
          // Then, delete the product (parent)
          this.prodS.deleteProduct({ id: id }).subscribe(() => {
            // Close dialog and reload data
            this.dialog.closeAll();
            this.LoadInitialData();
          });
        });
      } else {
        // If no description exists, delete the product directly
        this.prodS.deleteProduct({ id }).subscribe(() => {
          this.dialog.closeAll();
          this.LoadInitialData();
        });
      }
    });
  }


    addToWishlist(_t65: any) {
    throw new Error('Method not implemented.');
    }
  }
/* to do a refresh
private location:Location
this.location.go(this.location.path());
        window.location.reload();
 */
