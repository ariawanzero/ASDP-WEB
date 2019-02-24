import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CookieService } from 'ngx-cookie-service';

import { Authentication } from '../shared/class/authentication';
import { Menu } from '../shared/class/menu';
import { MENU } from '../shared/constant/menu';
import { LocalStorageService } from '../shared/service/local-storage.service';

import { AuthenticationService } from '../shared/service/authentication.service';
import { GlobalMessageService } from '../shared/service/global-message.service';
import { ForgotPasswordService } from './forgot.service';

@Component({
  selector: 'asdp-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  forgotForm: FormGroup;
  responseAuth: Authentication;

  constructor(
    private router:Router,
    private forgotServ: ForgotPasswordService,
    private localStorageServ: LocalStorageService,
    private globalMessageServ: GlobalMessageService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  forgotUser() {
    if(this.forgotForm.valid) {
      this.blockUI.start();
      this.forgotServ.forgotPassword(this.forgotForm.getRawValue()).subscribe(
        resp => {
          this.responseAuth = resp;
        }, (err) => {
          this.blockUI.stop();
          this.globalMessageServ.changeMessage(err);
        }, () => {
          this.localStorageServ.clearAll();
          this.blockUI.stop();
          this.router.navigate(['/login']);
        }
      )
    }
  }
}
