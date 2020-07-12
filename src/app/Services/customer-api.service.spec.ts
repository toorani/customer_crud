import { TestBed } from '@angular/core/testing';

import { CustomerAPIService } from './customer-api.service';

describe('CustomerAPIService', () => {
  let service: CustomerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
