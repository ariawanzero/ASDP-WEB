import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'asdp-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() { }

  onToogleSidebar(): void { this.sidebarService.toogleOnOff(); }

  onChangePassword(): void { 
    this.router.navigate(['change-password'], {
      relativeTo: this.activatedRoute, skipLocationChange: false
    });
  }

}
