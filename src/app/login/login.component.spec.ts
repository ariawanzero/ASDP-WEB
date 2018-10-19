import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from '../shared/service/authentication.service';
import { LocalStorageService } from '../shared/service/local-storage.service';

import { LoginComponent } from './login.component';
import { GlobalMessageService } from '../shared/service/global-message.service';


class MockAuthenticationService extends AuthenticationService {

}

class MockLocalStorageService extends LocalStorageService {

}

class MockGlobalMessageService extends GlobalMessageService {

}

class MockCookieService extends CookieService {

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [{
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }, {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }, {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService
        }, {
          provide: CookieService,
          useClass: MockCookieService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
