import { TestBed } from '@angular/core/testing';

import { AdminsManagementService } from './admins-management.service';

describe('AdminsManagementService', () => {
  let service: AdminsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
