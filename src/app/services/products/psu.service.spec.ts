import { TestBed } from '@angular/core/testing';

import { PsuService } from './psu.service';

describe('PsuService', () => {
  let service: PsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
