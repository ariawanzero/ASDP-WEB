import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { RouterGuardService } from './router-guard.service';
import { LocalStorageService } from './local-storage.service';

class MockAuthenticationService extends AuthenticationService {

}

class MockLocalStorageService extends LocalStorageService {

}

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RouterGuardService,
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }, {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }
      ]
    });
  });

  it('should be created', inject([RouterGuardService], (service: RouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
