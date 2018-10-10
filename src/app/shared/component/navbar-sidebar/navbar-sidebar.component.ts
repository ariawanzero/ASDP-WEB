import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { LocalStorageService } from '../../service/local-storage.service';
import { AuthenticationService } from '../../service/authentication.service';

import { SidebarService } from '../../service/sidebar.service';
import { Menu } from '../../class/menu';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'asdp-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrls: ['./navbar-sidebar.component.css']
})
export class NavbarSidebarComponent implements OnInit {
  isOpen: boolean = false;
  menuList: Menu[];

  constructor(
    private authServ: AuthenticationService,
    private sidebarServ: SidebarService,
    private localStorageServ: LocalStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuList = JSON.parse(this.localStorageServ.getValue('menu'));
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
    this.authServ.removeAccess().subscribe(
      resp => {
        console.log(resp);
      }, (err) => {
        console.log(err);
      }, () => {
        this.router.navigate(['']);
      }
    )
  }
}
