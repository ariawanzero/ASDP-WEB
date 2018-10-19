import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CookieService } from 'ngx-cookie-service';

import { LocalStorageService } from '../../service/local-storage.service';
import { AuthenticationService } from '../../service/authentication.service';

import { SidebarService } from '../../service/sidebar.service';
import { Menu } from '../../class/menu';

@Component({
  selector: 'asdp-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrls: ['./navbar-sidebar.component.css']
})
export class NavbarSidebarComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  isOpen: boolean = false;
  menuList: Menu[];
  user: string;

  constructor(
    private authServ: AuthenticationService,
    private sidebarServ: SidebarService,
    private localStorageServ: LocalStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.menuList = JSON.parse(this.localStorageServ.getValue('menu'));
    this.user = this.localStorageServ.getValue('client-name');
    this.changeToogleSidebar();
  }

  private changeToogleSidebar(): void {
    this.sidebarServ.listenStatus().subscribe(
      state => {
        this.isOpen = state;
      }, err => {
        this.isOpen = false;
      }
    );
  }

  goToPage(urlPage:string): void {
    this.router.navigate([urlPage], {
      relativeTo: this.activatedRoute, skipLocationChange: false
    });
  }

  goSignOut(): void {
    this.blockUI.start();
    this.authServ.removeAccess().subscribe(
      resp => {
        this.blockUI.stop();
      }, (err) => {
        this.blockUI.stop();
        console.log(err);
      }, () => {
        this.cookieService.deleteAll();
        this.localStorageServ.clearAll();
        this.router.navigate(['']);
      }
    )
  }
}
