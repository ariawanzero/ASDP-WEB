import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { ResponseService } from 'src/app/shared/service/response.service';
import { SysParamService } from '../sysparam.service';
import { SysParamDetailComponent } from './sysparam-detail.component';

class MockConfirmationDialogService extends ConfirmationDialogService {

}

class MockUserService extends SysParamService {

}

class MockResponseService extends ResponseService {

}

class MockGlobalMessageService extends GlobalMessageService {

}

describe('SysParamComponent', () => {
  let component: SysParamDetailComponent;
  let fixture: ComponentFixture<SysParamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ SysParamDetailComponent ],
      providers: [{
        provide: ConfirmationDialogService,
        useClass: MockConfirmationDialogService
      }, {
        provide: SysParamDetailComponent,
        useClass: MockUserService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }, {
        provide: GlobalMessageService,
        useClass: MockGlobalMessageService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysParamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize role', () => {
    expect(component.role).toBeDefined();
  });

  it('should initialize jabatan', () => {
    expect(component.jabatan).toBeDefined();
  });

  it('should initialize divisi', () => {
    expect(component.divisi).toBeDefined();
  });
});
