import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { SysParamService } from './sysparam.service';
import { LocalStorageService } from './local-storage.service';

class MockLocalStorageService extends LocalStorageService {

}

class MockCookieService extends CookieService {

}

describe('SysParamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ SysParamService,
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

  it('should be created', inject([SysParamService], (service: SysParamService) => {
    expect(service).toBeTruthy();
  }));
});
