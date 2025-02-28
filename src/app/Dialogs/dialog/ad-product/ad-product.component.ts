import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CaseService } from '../../../services/products/case.service';
import { CpuService } from '../../../services/products/cpu.service';
import { GpuService } from '../../../services/products/gpu.service';
import { MotherboardService } from '../../../services/products/motherboard.service';
import { ProductService } from '../../../services/products/product.service';
import { PsuService } from '../../../services/products/psu.service';
import { RamService } from '../../../services/products/ram.service';
import { StorageService } from '../../../services/products/storage.service';
import { WishlistItemService } from '../../../services/wishlist/wishlist-item.service';
import { ColorDescription, Product } from '../../../Interfaces/Product';
import { Observable } from 'rxjs';
import { ColorService } from '../../../services/products/color.service';
import { ImageServiceService } from '../../../services/cloudinary/image-service.service';

@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrls: ['./ad-product.component.css'],
})
export class AdProductComponent implements OnInit, DoCheck {
  myform!: FormGroup;
  rc: boolean = true;
  msg: string = '';
  editData: any | null = null;
  colors: [{ id: number; colore: string }] | undefined;
  productData: Product | undefined;
  isFormPatched: any;
  isColorInitialized: any;
  storageTypes: string[] = ['SSD_DATA', 'SSD_NVM', 'HDD'];

  //per le immagini
  private readonly UPLOADPRESET = 'projecthardware';
  selectedFile!: File;
  isFileSelected : boolean = false;
  imageUrl: string = '';

  constructor(
    private colorS: ColorService,
    private prodS: ProductService,
    private caseS: CaseService,
    private cpuS: CpuService,
    private gpuS: GpuService,
    private motherboardS: MotherboardService,
    private psuS: PsuService,
    private ramS: RamService,
    private storageS: StorageService,
    private thisRoute: ActivatedRoute,
    private router: Router,
    private wishlItemS: WishlistItemService,
    @Inject(MAT_DIALOG_DATA)
    protected data: { id?: number | null; type: string },
    protected dialogRef: MatDialogRef<AdProductComponent>,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private imageService: ImageServiceService
  ) {
    this.myform = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],

      //
      stock: [0, Validators.required],
      price: [0, Validators.required],
      imageUrl: [''],
      type: [
        { value: this.data?.type || '', disabled: !!this.data?.type },
        Validators.required,
      ],
      //Optional fields:
      //----------
      // Optional CPU fields
      ghz: [0],
      core: [0],

      //Optional GPU
      vram: [0],
      //Optional RAM
      mhz: [0],
      size: [0],
      //Optional Motherboard
      cpuCompatibility: [0],
      //Optional PSU
      watt: [0],
      //Optional Case
      color: [''],
      //Optional Storage
      stype: [''],
    });
  }

  ngOnInit(): void {
    if (this.data?.id && this.data.type) {
      const service = this.getProductService(this.data.type);
      if (!service) {
        return;
      }
      service.subscribe(
        (product: any) => {
          this.editData = product.dati;
          this.patchFormValues();
        },
        (error: any) => {
          console.error('Failed to fetch product data:', error);
        }
      );
    }
  }

  ngDoCheck(): void {
    if (!this.dialogRef) return; // Ensure logic runs only when the dialog is open

    const type = this.myform.get('type')?.value;
    const id = this.myform.get('id')?.value;

    if (id && !this.isFormPatched) {
      this.patchFormValues();
      this.isFormPatched = true; // Prevent infinite loops
    }

    if (type === 'case' && !this.isColorInitialized) {
      this.initializeColorsForCase();
      this.isColorInitialized = true;
    }

    // Manually trigger change detection to reflect updates
    this.cdr.detectChanges();
  }

  /*
  initializeForm(): void {


    this.myform = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      description: [''],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      imageUrl: [''],
      type: [
        { value: this.data?.type || '', disabled: !!this.data?.type },
        Validators.required
      ],
      //Optional fields:
      //----------
      // Optional CPU fields
      ghz: [0],
      core: [0],

      //Optional GPU
      vram:[0],
      //Optional RAM
      mhz:[0],
      size:[0],
      //Optional Motherboard
      cpuCompatibility:[0],
      //Optional PSU
      watt:[0],
      //Optional Case
      color:[''],
      //Optional Storage
      stype:['']



    });



  }
    */
  /*colori da aggiornare ed in più modificare descrizione aggiungerla ed infine andare ad aggiungere campi in tipi di
   * prodotti  diversi e
   * da gestire gli ultimi prodotti
   * infine gestire l' aggiunta dei prodotti di conseguenza l' eliminazione
   *
   *
   */
  initializeColorsForCase(): void {
    this.colorS.listColor().subscribe((x: any) => {
      this.colors = x.dati;
      console.table(this.colors);
    });
  }
  compareColors(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  patchFormValues(): void {
    this.isFileSelected = true;
    if (this.editData) {
      this.myform.patchValue({
        brand: this.editData.brand,
        model: this.editData.model,
        //per la descrizione

        //
        stock: this.editData.stock,
        price: this.editData.price,
        imageUrl: this.editData.imageUrl,
        //per cpu
        ghz: this.editData.ghz,
        core: this.editData.core,
        //per gpu
        vram: this.editData.vram,
        //per ram
        mhz: this.editData.mhz,
        size: this.editData.size,
        //per motherboard
        cpuCompatibility: this.editData.cpuCompatibility,
        //per psu
        watt: this.editData.watt,
        //per case
        color: this.editData.color,
        //per storage
        stype: this.editData.stype,
      });
    }
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    /*
     */
    if (this.data != null) {
      if (this.data.type === 'case') {
        const productData: Product = {
          ...this.myform.value,
          type: this.data.type,
          size: this.myform.value.size, // assuming this is where size is stored
          color: this.myform.value.color.colore,
        };
        console.log(
          'productData size: ' + productData.size?.toString(),
          productData.color?.toString()
        );
        this.updateProduct(productData);
      } else {
        const productData: Product = {
          ...this.myform.value,
          type: this.data.type,
        };
        console.log(
          'productData size: ' + productData.size?.toString(),
          productData.color?.toString()
        );
        this.updateProduct(productData);
      }
    } else {
      if (this.myform.value.type === 'case') {
        /*
        const color: ColorDescription = {
          id: this.myform.value.color.id,
          // Map "colore" to "color" so that the JSON property matches the backend.
          color: this.myform.value.color.colore
        };
*/
        const productData: Product = {
          ...this.myform.value,
          color: this.myform.value.color.colore,
        };

        this.createProduct(productData);
      } else {
        const productData: Product = {
          ...this.myform.value,
        };

        this.createProduct(productData);
      }
    }
  }

  createProduct(product: Product): void {
    console.table(product);
    const service = this.createProductService(product);
    if (!service) {
      console.error('No service found for product type:', this.data.type);
      return;
    }

    service.subscribe(
      (response: any) => {
        this.rc = response.rc;
        this.msg = response.msg;
        if (response.rc) {
          this.dialogRef.close('reload');
          window.location.reload();
          //reload the elements
        }
      },
      (error: string) => console.error('Error creating product:', error)
    );
  }

  updateProduct(product: Product): void {
    const service = this.updateProductService(product);
    console.log('type %d' + product.type);
    if (!service || !this.data.id) {
      console.error('No service found for product type:', this.data.type);
      return;
    }
    product.id = this.data.id;

    service.subscribe(
      (response: any) => {
        this.rc = response.rc;
        this.msg = response.msg;
        if (response.rc) {
          this.dialogRef.close('reload');
        }
      },
      (error: any) => console.error('Error updating product:', error)
    );
  }

  getProductService(type: string): any {
    const productServiceMap: { [key: string]: any } = {
      case: this.caseS.getCase(this.data.id!),
      cpu: this.cpuS.getCpu(this.data.id!),
      gpu: this.gpuS.getGpu(this.data.id!),
      motherboard: this.motherboardS.getMotherboard(this.data.id!),
      psu: this.psuS.getPsu(this.data.id!),
      ram: this.ramS.getRam(this.data.id!),
      storage: this.storageS.getStorage(this.data.id!),
    };
    //aggiungere product
    return productServiceMap[type] || null;
  }

  createProductService(product: Product): any {
    const productServiceMap: { [key: string]: any } = {
      case: this.caseS.createCase(product),
      cpu: this.cpuS.createCpu(product),
      gpu: this.gpuS.createGpu(product),
      motherboard: this.motherboardS.createMotherboard(product),
      psu: this.psuS.createPsu(product),
      ram: this.ramS.createRam(product),
      storage: this.storageS.createStorage(product),
    };
    //aggiungere product
    return productServiceMap[product.type] || null;
  }
  updateProductService(product: Product): any {
    const productServiceMap: { [key: string]: any } = {
      case: this.caseS.updateCase(product),
      cpu: this.cpuS.updateCpu(product),
      gpu: this.gpuS.updateGpu(product),
      motherboard: this.motherboardS.updateMotherboard(product),
      psu: this.psuS.updatePsu(product),
      ram: this.ramS.updateRam(product),
      storage: this.storageS.updateStorage(product),
    };
    //aggiungere product
    return productServiceMap[product.type] || null;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
    this.uploadImage();
    this.isFileSelected = true;
  }

  uploadImage() {
    if (!this.selectedFile) {
      alert('Seleziona un file prima di caricare!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', this.UPLOADPRESET);

    this.imageService.caricaImmagine(formData).subscribe({
      next: (response: any) => {
        // Ottiene l'URL sicuro dell'immagine
        this.myform.patchValue({
          imageUrl: response.secure_url,
        });
      },
      error: (error) => {
        console.error('Errore nel caricamento:', error);
        this.myform.patchValue({
          imageUrl: 'https://i.ibb.co/dJkZ9BRK/products.jpg', //immagine generica
        });
      },
    });
  }

  checkForImageUpdate($event: any) {
    console.log($event);
    if (!this.isFileSelected) {
      let imgUrl = '';
    
      switch ($event) {
        case 'storage':
          imgUrl = 'https://i.ibb.co/6JTqzKg4/generic-storage.webp';
        break
        case 'ram':
          imgUrl = 'https://i.ibb.co/q31bvYx9/ram.jpg';
          break;
        case 'motherboard':
          imgUrl = 'https://i.ibb.co/hxL7tvFJ/motherboard.jpg';
          break;
        case 'gpu':
          imgUrl = 'https://i.ibb.co/Rkkhw7Gr/gpu.jpg';
          break;
        case 'case':
          imgUrl = 'https://i.ibb.co/0jjJCNcz/case.jpg';
          break;
        case 'psu':
          imgUrl = 'https://i.ibb.co/XZWxg4sP/psu.jpg';
          break;
        case 'cpu':
          imgUrl = 'https://i.ibb.co/7dYFCy3h/cpu.jpg';
          break;
        case 'products':
          imgUrl = 'https://i.ibb.co/dJkZ9BRK/products.jpg';
          break;
        default:
          imgUrl = 'https://i.ibb.co/dJkZ9BRK/products.jpg';
          break;
      }
    
      this.myform.patchValue({
        imageUrl: imgUrl
      });
    }
    
  }

  checkImageFieldStorage($event:any){
    console.log($event);
    if (!this.isFileSelected || (this.isFileSelected && !this.myform.value.imageUrl)){
      let imgUrl = '';
      switch ($event) {
        case 'SSD_DATA':
          imgUrl = 'https://i.ibb.co/5Wfs3dj7/ssd.jpg';
          break;
        case 'SSD_NVM':
          imgUrl = 'https://i.ibb.co/qFBtSsJj/nvme.jpg';          
          break;
        case 'HDD':
          imgUrl = 'https://i.ibb.co/3yrd0QnF/hdd.jpg';
          break;
    }
    this.myform.patchValue({
      imageUrl: imgUrl
    });
  }
}

}
