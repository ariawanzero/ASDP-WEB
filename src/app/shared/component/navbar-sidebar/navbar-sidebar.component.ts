import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'asdp-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrls: ['./navbar-sidebar.component.css']
})
export class NavbarSidebarComponent implements OnInit {
  isOpen: boolean = false;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.changeToogleSidebar();
  }

  private changeToogleSidebar(): void {
    this.sidebarService.listenStatus().subscribe(
      state => {
        this.isOpen = state;
      }, err => {
        this.isOpen = false;
      }
    );
  }

}
