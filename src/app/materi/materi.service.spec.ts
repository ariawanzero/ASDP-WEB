import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MateriService } from './materi.service';
import { ResponseService } from '../shared/service/response.service';

class MockResponseService extends ResponseService{

}

describe('MateriService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MateriService, 
        {
          provide: ResponseService,
          useClass: MockResponseService
        }
      ]
    });
  });

  it('should be created', inject([MateriService], (service: MateriService) => {
    expect(service).toBeTruthy();
  }));
});
