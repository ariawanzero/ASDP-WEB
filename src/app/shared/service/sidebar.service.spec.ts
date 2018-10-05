import { TestBed, inject } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService]
    });
  });

  it('should be created', inject([SidebarService], (service: SidebarService) => {
    expect(service).toBeTruthy();
  }));

  it('should be define Toogle Menu and False', inject([SidebarService], (service: SidebarService) => {
    expect(service.toggleMenu).toBeDefined();
    service.toggleMenu.subscribe(res => {
      expect(res).toBe(false);
    })
  }));

  it('should be ToogleOnOff and True', inject([SidebarService], (service: SidebarService) => {
    service.toogleOnOff();
    service.toggleMenu.subscribe(res => {
      expect(res).toBe(true);
    })
  }));

  it('should be ToogleOff and True', inject([SidebarService], (service: SidebarService) => {
    service.toogleOff();
    service.toggleMenu.subscribe(res => {
      expect(res).toBe(false);
    })
  }));
});
