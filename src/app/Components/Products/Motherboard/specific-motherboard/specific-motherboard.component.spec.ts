import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificMotherboardComponent } from './specific-motherboard.component';

describe('SpecificMotherboardComponent', () => {
  let component: SpecificMotherboardComponent;
  let fixture: ComponentFixture<SpecificMotherboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificMotherboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificMotherboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
