import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ROLE } from '../../shared/constant/role';

import { SimpleObject } from '../../shared/class/simple-object';

@Component({
  selector: 'asdp-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  role: SimpleObject[] = ROLE;

  constructor() { }

  ngOnInit() {
  }

}
