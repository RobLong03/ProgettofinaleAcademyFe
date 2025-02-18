import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRamComponent } from './specific-ram.component';

describe('SpecificRamComponent', () => {
  let component: SpecificRamComponent;
  let fixture: ComponentFixture<SpecificRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificRamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
