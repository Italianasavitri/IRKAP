import { TestBed } from '@angular/core/testing';

import { DepartemenService } from './departemen.service';

describe('DepartemenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartemenService = TestBed.get(DepartemenService);
    expect(service).toBeTruthy();
  });
});
