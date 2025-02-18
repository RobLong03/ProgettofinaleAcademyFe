import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificStorageComponent } from './specific-storage.component';

describe('SpecificStorageComponent', () => {
  let component: SpecificStorageComponent;
  let fixture: ComponentFixture<SpecificStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificStorageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
