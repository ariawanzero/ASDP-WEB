import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResponseService } from '../../shared/service/response.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { SysParamService } from '../sysparam.service';
import { SysParamListComponent } from './sysparam-list.component';
import { SysParam } from '../sysparam';

class MockSysParamService extends SysParamService {

}

class MockResponseService extends ResponseService{

}

class MockGlobalMessageService extends GlobalMessageService {

}

describe('SysParamListComponent', () => {
  let component: SysParamListComponent;
  let fixture: ComponentFixture<SysParamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ SysParamListComponent ],
      providers: [{
        provide: SysParamService,
        useClass: MockSysParamService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }, {
        provide: GlobalMessageService,
        useClass: MockGlobalMessageService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysParamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize type', () => {
    expect(component.type).toBeDefined();
  });
});
