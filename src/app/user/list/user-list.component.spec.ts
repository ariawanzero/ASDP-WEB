import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from '../user.service';
import { ResponseService } from '../../shared/service/response.service';
import { LocalStorageService } from '../../shared/service/local-storage.service';

import { UserListComponent } from './user-list.component';

class MockUserService extends UserService {

}

class MockResponseService extends ResponseService{

}

class MockLocalStorageService extends LocalStorageService {

}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ UserListComponent ],
      providers: [{
        provide: UserService,
        useClass: MockUserService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }, {
        provide: LocalStorageService,
        useClass: MockLocalStorageService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
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

  it('should initialize status', () => {
    expect(component.stats).toBeDefined();
  });
});
