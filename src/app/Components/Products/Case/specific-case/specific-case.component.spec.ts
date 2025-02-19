import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCaseComponent } from './specific-case.component';

describe('SpecificCaseComponent', () => {
  let component: SpecificCaseComponent;
  let fixture: ComponentFixture<SpecificCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
