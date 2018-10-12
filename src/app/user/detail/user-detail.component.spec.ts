import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';

import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../user.service';
import { ResponseService } from 'src/app/shared/service/response.service';

class MockConfirmationDialogService extends ConfirmationDialogService {

}

class MockUserService extends UserService {

}

class MockResponseService extends ResponseService {

}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ UserDetailComponent ],
      providers: [{
        provide: ConfirmationDialogService,
        useClass: MockConfirmationDialogService
      }, {
        provide: UserService,
        useClass: MockUserService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
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
