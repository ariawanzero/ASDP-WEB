import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarService } from '../../service/sidebar.service';

import { NavbarTopComponent } from './navbar-top.component';

describe('NavbarTopComponent', () => {
  let component: NavbarTopComponent;
  let fixture: ComponentFixture<NavbarTopComponent>;
  let sidebarService: SidebarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavbarTopComponent ],
      providers: [ SidebarService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTopComponent);
    component = fixture.componentInstance;
    sidebarService = new SidebarService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
