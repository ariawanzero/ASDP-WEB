import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarService } from '../../service/sidebar.service';

import { NavbarSidebarComponent } from './navbar-sidebar.component';

describe('NavbarSidebarComponent', () => {
  let component: NavbarSidebarComponent;
  let fixture: ComponentFixture<NavbarSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSidebarComponent ],
      providers: [ SidebarService ]
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
