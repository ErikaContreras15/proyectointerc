import { TestBed } from '@angular/core/testing';

import { AdminGuardarService } from './admin-guardar.service';

describe('AdminGuardarService', () => {
  let service: AdminGuardarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuardarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
