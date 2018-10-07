import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../shared/service/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
