import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../Interfaces/Product';
import { ProductService } from '../../../services/products/product.service';


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

  constructor(private prodS: ProductService) {}

  ngOnInit(): void {
    this.LoadInitialData();
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
      this.productList = this.response.dati; // Assumendo che i dati siano sotto 'dati'
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      // Associa paginator e sort alla data source
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onClick(id: number, type:string) {
   
    }
    addToCart(_t65: any) {
    throw new Error('Method not implemented.');
    }
    addToWishlist(_t65: any) {
    throw new Error('Method not implemented.');
    }
}
