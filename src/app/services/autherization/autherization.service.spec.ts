import { TestBed } from '@angular/core/testing';

import { AutherizationService } from './autherization.service';

describe('AutherizationService', () => {
  let service: AutherizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutherizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
