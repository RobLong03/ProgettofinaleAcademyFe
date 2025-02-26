import { Component, Input, OnInit } from '@angular/core';
import { ProductDescription } from '../../../Interfaces/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductDescriptionService } from '../../../services/products/product-description.service';

@Component({
  selector: 'app-product-description-panel',
  templateUrl: './product-description-panel.component.html',
  styleUrl: './product-description-panel.component.css'
})
export class ProductDescriptionPanelComponent implements OnInit {
  // Pass the product id to the component
  @Input() idprodo!: number;

  // Hold all descriptions for the product
  descriptions: any;
  // Form for adding a new description
  addDescriptionForm!: FormGroup;
  // Keep an edit form for each description by its id
  editDescriptionForms: { [key: number]: FormGroup } = {};

  constructor(
    private productDescriptionService: ProductDescriptionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initAddDescriptionForm();
    this.loadDescriptions();
    console.log(this.idprodo);
  }

  // Initialize the form for adding a new description
  initAddDescriptionForm() {
    this.addDescriptionForm = this.fb.group({
      lang: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadDescriptions() {
    if(this.idprodo){
      this.productDescriptionService.getDescription(this.idprodo).subscribe(
        (data: any) => {
          // Ensure we have an array, and set a default for missing descriptions
          this.descriptions = (data.dati || []).map((desc: any) => ({
            ...desc,
            description: desc.description || ''
          }));

          console.table(this.descriptions);
          // Create an edit form for each description
          this.descriptions.forEach((desc: { id: number; description: string; lang: string; id_prodotto: number; }) => {
            this.editDescriptionForms[desc.id] = this.fb.group({
              description: [desc.description, Validators.required],
              lang: [desc.lang, Validators.required],
              id: [desc.id],
              id_prodotto: [desc.id_prodotto]
            });
          });
        },
        error => {
          console.error('Error loading descriptions', error);
        }
      );
    }
    }



  // Add a new description using the service
  addDescription() {
    if (this.addDescriptionForm.valid && this.idprodo != null) {

      const newDesc: Partial<ProductDescription> = {
        // Omit the id property so the backend can generate it.
        lang: this.addDescriptionForm.value.lang,
        idprodotto: this.idprodo,
        description: this.addDescriptionForm.value.description
      }
      console.log(newDesc);
      this.productDescriptionService.createDescription(newDesc).subscribe(
        (created: any) => {
          // Add the new description to the local array
          this.loadDescriptions()
          // Reset the add form
          this.addDescriptionForm.reset({ lang: '', description: '' });
        },
        (error: any) => {
          console.error('Error creating description', error);
        }
      );
    }
  }


 // Update an existing description
updateDescription(desc: ProductDescription) {
  const editForm = this.editDescriptionForms[desc.id];
  console.log(editForm);
  if (editForm.valid && this.idprodo != null) {
    const newDesc: ProductDescription = {
      // Omit the id property so the backend can generate it.
      id:editForm.value.id,
      lang: editForm.value.lang,
      idprodotto: this.idprodo,
      description:editForm.value.description
    }
    this.productDescriptionService.createDescription(newDesc).subscribe(
      (created: any) => {

        this.loadDescriptions()

        this.addDescriptionForm.reset({ lang: '', description: '' });
      },
      (error: any) => {
        console.error('Error creating description', error);
      }
    );
  }

}


  // Delete a description
  deleteDescription(desc: ProductDescription) {

    // Note: Your service delete method uses GET with a body.
    // In a real-world scenario, this would typically be a DELETE method.
    this.productDescriptionService.deleteDescription({ id: desc.id }).subscribe(
      (      response: any) => {
        // Remove the description from the local array on success
        this.descriptions = this.descriptions.filter((d: { id: number; }) => d.id !== desc.id);
        delete this.editDescriptionForms[desc.id];
      },
      (      error: any) => {
        console.error('Error deleting description', error);
      }
    );

  }
}
