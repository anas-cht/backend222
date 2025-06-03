import { TestBed } from '@angular/core/testing';

import { CurrenciesService } from './currencies_services';

describe('AdminService', () => {
  let service: CurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
