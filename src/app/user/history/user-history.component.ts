import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';

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
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UserService
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
        console.log(err);
        this.blockUI.stop();
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
