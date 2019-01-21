import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { SimpleObject } from '../shared/class/simple-object';
import { PagingData } from '../shared/class/paging-data';

import { GlobalMessageService } from '../shared/service/global-message.service';

import { NEWS } from '../shared/constant/news';

import { DashboardService } from './dashboard.service';

import { DasboardFilter } from './dashboard';
import { Document } from '../document/document';

import { USER_LOGIN, DOCUMENT_VIEW, QUIZ_DIVISI } from './data';

@Component({
  selector: 'asdp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  news: SimpleObject[] = NEWS;

  filter: DasboardFilter;
  page: PagingData<Document[]>

  // charts
  singleQuizDivisi: any[] = QUIZ_DIVISI;
  multiUserLogin: any[] = USER_LOGIN;
  multiDocumentView: any[] = DOCUMENT_VIEW;

  view: any[] = [355, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Divisi';

  colorScheme = {
    domain: ['#A8385D', '#7AA3E5','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private router: Router,
    private dashboardServ: DashboardService,
    private globalMsgServ: GlobalMessageService,
  ) { console.log(this.multiUserLogin) }

  ngOnInit() {
    this.filter = new DasboardFilter();

    this.getDocumentList();
  }

  private getDocumentList(): void {
    this.blockUI.start();
    this.dashboardServ.getFilteredDocumentAdvanced(this.filter).subscribe(
      resp => {
        this.page = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.filter.name = '';
        this.blockUI.stop();
        this.remaping();
      }
    )
  }

  private remaping(): void {
    if(this.page.data) {
      this.page.data.forEach(data => {
        data.divisiDisplay = JSON.parse(data.divisi);
      })
    }
  }

  onSearch(): void { 
    this.filter.page = 0;
    this.getDocumentList();
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getDocumentList();
  }

  onGoToDetail(id: string): void {
    this.router.navigate(['/home/document/detail', id]);
  }

}
