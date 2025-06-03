import { TestBed } from '@angular/core/testing';

import { SupportmessageServiceTsService } from './supportmessage-service.ts.service';

describe('SupportmessageServiceTsService', () => {
  let service: SupportmessageServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportmessageServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
