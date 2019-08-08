import { TestBed } from '@angular/core/testing';

import { RolefeatureService } from './rolefeature.service';

describe('RolefeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolefeatureService = TestBed.get(RolefeatureService);
    expect(service).toBeTruthy();
  });
});
