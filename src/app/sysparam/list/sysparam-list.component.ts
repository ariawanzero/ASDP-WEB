import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ROLE } from '../../shared/constant/role';
import { JABATAN } from '../../shared/constant/jabatan';
import { DIVISI } from '../../shared/constant/divisi';
import { STATS } from '../../shared/constant/stats';

import { SimpleObject } from '../../shared/class/simple-object';
import { PagingData } from '../../shared/class/paging-data';

import { GlobalMessageService } from '../../shared/service/global-message.service';
import { TYPE } from '../../shared/constant/type';
import { SysParamFilter, SysParam } from '../sysparam';
import { SysParamService } from '../sysparam.service';

@Component({
  selector: 'asdp-sysparam-list',
  templateUrl: './sysparam-list.component.html',
  styleUrls: ['./sysparam-list.component.css']
})
export class SysParamListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  type: SimpleObject[] = TYPE;

  filter: SysParamFilter;
  page: PagingData<SysParam[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalMsgServ: GlobalMessageService,
    private sysparamServ: SysParamService
  ) { }

  ngOnInit() {
    this.filter = new SysParamFilter();
    this.getSysParamList();
  }

  private getSysParamList(): void {
    this.blockUI.start();
    this.sysparamServ.getFilteredSysParam(this.filter).subscribe(
      resp => {
        this.page = resp;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onSearch(): void { 
    this.filter.page = 0;
    this.getSysParamList();
  }

  onAdd(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onNotify(idx: number) {
    this.filter.page = idx;
    this.getSysParamList();
  }

  onEditSysParam(code: string) {
    this.router.navigate(['edit', code], { relativeTo: this.route });
  }
}
