import { TestBed } from '@angular/core/testing';
import { AuthIterceptorService } from './auth-iterceptor.service';


describe('AuthIterceptorService', () => {
  let service: AuthIterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthIterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
