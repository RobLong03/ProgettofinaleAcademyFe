import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificGpuComponent } from './specific-gpu.component';

describe('SpecificGpuComponent', () => {
  let component: SpecificGpuComponent;
  let fixture: ComponentFixture<SpecificGpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificGpuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificGpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
