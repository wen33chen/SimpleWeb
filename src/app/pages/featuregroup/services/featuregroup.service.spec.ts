import { TestBed, inject } from '@angular/core/testing';

import { FeaturegroupService } from './featuregroup.service';

describe('FeaturegroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturegroupService]
    });
  });

  it('should be created', inject([FeaturegroupService], (service: FeaturegroupService) => {
    expect(service).toBeTruthy();
  }));
});
