import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MateriService } from '../materi.service';
import { ResponseService } from '../../shared/service/response.service';
import { ModalService } from '../../shared/service/modal.service';

import { MateriUploadComponent } from './materi-upload.component';

class MockMateriService extends MateriService {

}

class MockResponseService extends ResponseService{

}

class MockModalService extends ModalService {

}

describe('MateriUploadComponent', () => {
  let component: MateriUploadComponent;
  let fixture: ComponentFixture<MateriUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      declarations: [ MateriUploadComponent ],
      providers: [{
        provide: MateriService,
        useClass: MockMateriService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }, {
        provide: ModalService,
        useClass: MockModalService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
