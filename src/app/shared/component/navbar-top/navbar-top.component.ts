import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'asdp-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() { }

  onToogleSidebar(): void { this.sidebarService.toogleOnOff(); }

}
