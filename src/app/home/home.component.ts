import { Component, OnInit } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { SidebarService } from '../shared/service/sidebar.service';

@Component({
  selector: 'asdp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  isOpen: boolean = false;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.blockUI.start();

    setTimeout(() => {
      this.changeToogleSidebar();
      this.blockUI.stop();
    }, 2500);
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
