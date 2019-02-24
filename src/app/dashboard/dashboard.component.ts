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
import { SysParam } from '../shared/class/sysparam';
import { SysParamService } from '../shared/service/sysparam.service';
import { LocalStorageService } from '../shared/service/local-storage.service';
import { UserService } from '../user/user.service';
import { User, UserDetail } from '../user/user';

@Component({
  selector: 'asdp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  news: SimpleObject[] = NEWS;

  filter: DasboardFilter;
  type: SimpleObject[];
  paramReq: SysParam;
  role: string;
  user: UserDetail;
  document: Document;
  page: PagingData<Document[]>

  constructor(
    private router: Router,
    private dashboardServ: DashboardService,
    private sysparamServ: SysParamService,
    private globalMsgServ: GlobalMessageService,
    private localStorageServ: LocalStorageService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.filter = new DasboardFilter();
    this.role = this.localStorageServ.getValue('client-role-name');
    this.paramReq = new SysParam();
    this.getSysParamType();
    this.getCountHistLogin();
    this.getCountHistDoc();
  }

  private getSysParamType(): void {
    this.paramReq.type='TYPE';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.type = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getCountHistLogin(): void {
    this.blockUI.start();
    this.paramReq.type='TYPE';
    this.userServ.getCountHistLogin(this.paramReq).subscribe(
      resp => {
        this.user = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  private getCountHistDoc(): void {
    this.blockUI.start();
    this.paramReq.type='TYPE';
    this.dashboardServ.getCountHistDoc(this.paramReq).subscribe(
      resp => {
        this.document = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onKeydown(event: any) {
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

  onSearch(type : string): void { 
    this.filter.page = 0;
    this.filter.type = type;
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
