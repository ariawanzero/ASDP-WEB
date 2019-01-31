import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResponseService } from '../shared/service/response.service';
import { SysParamService } from '../shared/service/sysparam.service';

class MockResponseService extends ResponseService{

}

describe('SysParamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SysParamService,
        {
          provide: ResponseService,
          useClass: MockResponseService
        }
      ]
    });
  });

  it('should be created', inject([SysParamService], (service: SysParamService) => {
    expect(service).toBeTruthy();
  }));
});
