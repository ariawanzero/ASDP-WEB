import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfirmationDialogService } from '../shared/service/confirmation-dialog.service';
import { LocalStorageService } from '../shared/service/local-storage.service';
import { ResponseService } from '../shared/service/response.service';

import { ChangePasswordService } from './change-password.service';

import { ChangePasswordComponent } from './change-password.component';

class MockConfirmationDialogService extends ConfirmationDialogService {

}

class MockLocalStorageService extends LocalStorageService {

}

class MockChangePasswordService extends ChangePasswordService {

}

class MockResponseService extends ResponseService {

}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ ChangePasswordComponent ],
      providers: [{
        provide: ConfirmationDialogService,
        useClass: MockConfirmationDialogService
      }, {
        provide: LocalStorageService,
        useClass: MockLocalStorageService
      }, {
        provide: ChangePasswordService,
        useClass: MockChangePasswordService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
