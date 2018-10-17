import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';

class MockLocalStorageService extends LocalStorageService {

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
        }
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
