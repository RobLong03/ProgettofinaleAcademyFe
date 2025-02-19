import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPsuComponent } from './specific-psu.component';

describe('SpecificPsuComponent', () => {
  let component: SpecificPsuComponent;
  let fixture: ComponentFixture<SpecificPsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificPsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificPsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
