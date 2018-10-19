import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CookieService } from 'ngx-cookie-service';

import { SidebarService } from '../../service/sidebar.service';
import { AuthenticationService } from '../../service/authentication.service';
import { LocalStorageService } from '../../service/local-storage.service';

import { NavbarSidebarComponent } from './navbar-sidebar.component';


class MockAuthenticationService extends AuthenticationService {

}

class MockLocalStorageService extends LocalStorageService {

}

class MockCookieService extends CookieService {

}

describe('NavbarSidebarComponent', () => {
  let component: NavbarSidebarComponent;
  let fixture: ComponentFixture<NavbarSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ NavbarSidebarComponent ],
      providers: [ SidebarService, 
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }, {
          provide: LocalStorageService,
          useClass: MockLocalStorageService
        }, {
          provide: CookieService,
          useClass: MockCookieService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should isOpen to init false', () => {
    expect(component.isOpen).toBe(false);
  })
});
