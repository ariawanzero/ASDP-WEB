import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CookieService } from 'ngx-cookie-service';

import { LocalStorageService } from '../../service/local-storage.service';
import { AuthenticationService } from '../../service/authentication.service';

import { SidebarService } from '../../service/sidebar.service';
import { Menu } from '../../class/menu';

@Component({
  selector: 'asdp-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  menuList: Menu[];
  root: String;

  constructor(
    private localStorageServ: LocalStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.menuList = JSON.parse(this.localStorageServ.getValue('menu'));
    this.checkActiveChild();
  }
  
  goToPage(urlPage:string, menu: string): void {
    this.router.navigate([urlPage], {
      relativeTo: this.activatedRoute, skipLocationChange: false
    });
    this.checkActiveChild(menu);
  }

  private checkActiveChild(param: string = undefined): void {
    this.root = param ? param : this.activatedRoute.firstChild.snapshot.url[0].path.toUpperCase();
  }
}
