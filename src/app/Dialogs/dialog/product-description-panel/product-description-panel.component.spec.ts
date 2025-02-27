import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionPanelComponent } from './product-description-panel.component';

describe('ProductDescriptionPanelComponent', () => {
  let component: ProductDescriptionPanelComponent;
  let fixture: ComponentFixture<ProductDescriptionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDescriptionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDescriptionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
