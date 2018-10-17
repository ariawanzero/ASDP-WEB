import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResponseService } from 'src/app/shared/service/response.service';

import { ChangePasswordService } from './change-password.service';

class MockResponseService extends ResponseService {

}

describe('ChangePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ChangePasswordService, 
        {
          provide: ResponseService,
          useClass: MockResponseService
        }]
    });
  });

  it('should be created', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
