import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MateriService } from '../materi.service';
import { ResponseService } from '../../shared/service/response.service';
import { ModalService } from '../../shared/service/modal.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { MateriListComponent } from './materi-list.component';

class MockMateriService extends MateriService {

}

class MockResponseService extends ResponseService {

}

class MockModalService extends ModalService {

}

class MockGlobalMessageService extends GlobalMessageService {

}

describe('MateriListComponent', () => {
  let component: MateriListComponent;
  let fixture: ComponentFixture<MateriListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ MateriListComponent ],
      providers: [{
        provide: MateriService,
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
    fixture = TestBed.createComponent(MateriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
