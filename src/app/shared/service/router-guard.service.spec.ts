import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from './authentication.service';
import { RouterGuardService } from './router-guard.service';
import { LocalStorageService } from './local-storage.service';

class MockAuthenticationService extends AuthenticationService {

}

class MockLocalStorageService extends LocalStorageService {

}

class MockCookieService extends CookieService {

}

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      providers: [ RouterGuardService,
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }, {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }, {
          provide: CookieService,
          useClass: MockCookieService
        }
      ]
    });
  });

  it('should be created', inject([RouterGuardService], (service: RouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
