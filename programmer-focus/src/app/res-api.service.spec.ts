import { TestBed, inject } from '@angular/core/testing';

import { ResApiService } from './res-api.service';

describe('ResApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResApiService]
    });
  });

  it('should be created', inject([ResApiService], (service: ResApiService) => {
    expect(service).toBeTruthy();
  }));
});
