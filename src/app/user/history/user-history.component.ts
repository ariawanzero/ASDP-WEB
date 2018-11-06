import { Component, OnInit } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { UserService } from '../user.service';

import { UserHistoryFilter, UserHistory } from '../user'; 

@Component({
  selector: 'asdp-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  filter: UserHistoryFilter;
  page: PagingData<UserHistory[]>;
  
  constructor(
    private userServ: UserService,
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.filter = new UserHistoryFilter();

    this.getUsersHistory();
  }

  private getUsersHistory(): void {
    this.blockUI.start();
    this.userServ.getFilteredUserHistory(this.filter).subscribe(
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
    this.getUsersHistory();
  }

  onNotify(idx: number) {
    this.filter.page = idx;
    this.getUsersHistory();
  }
}
