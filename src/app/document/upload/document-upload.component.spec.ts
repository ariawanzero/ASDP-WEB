import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DocumentService } from '../document.service';
import { ResponseService } from '../../shared/service/response.service';
import { ModalService } from '../../shared/service/modal.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { DocumentUploadComponent } from './document-upload.component';

class MockMateriService extends DocumentService {

}

class MockResponseService extends ResponseService{

}

class MockModalService extends ModalService {

}

class MockGlobalMessageService extends GlobalMessageService {

}

describe('DocumentUploadComponent', () => {
  let component: DocumentUploadComponent;
  let fixture: ComponentFixture<DocumentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      declarations: [ DocumentUploadComponent ],
      providers: [{
        provide: DocumentService,
        useClass: MockMateriService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }, {
        provide: ModalService,
        useClass: MockModalService
      }, {
        provide: GlobalMessageService,
        useClass: MockGlobalMessageService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
