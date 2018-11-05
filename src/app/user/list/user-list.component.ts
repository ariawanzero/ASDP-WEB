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

import { UserService } from '../user.service';

import { UserFilter, User } from '../user';

@Component({
  selector: 'asdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  role: SimpleObject[] = ROLE;
  jabatan: SimpleObject[] = JABATAN;
  divisi: SimpleObject[] = DIVISI;
  stats: SimpleObject[] = STATS;

  filter: UserFilter;
  page: PagingData<User[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UserService,
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.filter = new UserFilter();
    
    this.getUserList();
  }

  private getUserList(): void {
    this.blockUI.start();
    this.userServ.getFilteredUser(this.filter).subscribe(
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
    this.getUserList();
  }

  onAdd(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onNotify(idx: number) {
    this.filter.page = idx;
    this.getUserList();
  }

  onEditUser(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
}
