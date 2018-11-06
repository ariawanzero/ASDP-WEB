import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserHistoryComponent } from './user-history.component';
import { UserService } from '../user.service';

import { ResponseService } from '../../shared/service/response.service';
import { DateFormatPipe } from '../../shared/pipe/date-format.pipe';
import { GlobalMessageService } from '../../shared/service/global-message.service';

class MockUserService extends UserService {

}

class MockResponseService extends ResponseService{

}

class MockGlobalMessageService extends GlobalMessageService {

}

describe('UserHistoryComponent', () => {
  let component: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ UserHistoryComponent, DateFormatPipe ],
      providers: [{
        provide: UserService,
        useClass: MockUserService
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
    fixture = TestBed.createComponent(UserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
