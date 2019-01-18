import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { SimpleObject } from '../shared/class/simple-object';
import { PagingData } from '../shared/class/paging-data';

import { GlobalMessageService } from '../shared/service/global-message.service';

import { NEWS } from '../shared/constant/news';

import { DashboardService } from './dashboard.service';

import { DasboardFilter } from './dashboard';

@Component({
  selector: 'asdp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  news: SimpleObject[] = NEWS;

  filter: DasboardFilter;
  // page: PagingData<[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardServ: DashboardService,
    private globalMsgServ: GlobalMessageService,
  ) { }

  ngOnInit() {
    this.filter = new DasboardFilter();

    console.log(this.filter);
  }

}
