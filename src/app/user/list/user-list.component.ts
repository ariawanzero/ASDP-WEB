import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ROLE } from '../../shared/constant/role';
import { JABATAN } from '../../shared/constant/jabatan';
import { DIVISi } from '../../shared/constant/divisi';

import { SimpleObject } from '../../shared/class/simple-object';

@Component({
  selector: 'asdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  role: SimpleObject[] = ROLE;
  jabatan: SimpleObject[] = JABATAN;
  divisi: SimpleObject[] = DIVISi;

  constructor() { }

  ngOnInit() { }
}
