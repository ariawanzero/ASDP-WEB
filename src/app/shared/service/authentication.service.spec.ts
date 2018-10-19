import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';

class MockLocalStorageService extends LocalStorageService {

}

class MockCookieService extends CookieService {

}

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ AuthenticationService,
        {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }, {
          provide: CookieService,
          useClass: MockCookieService
        }
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
