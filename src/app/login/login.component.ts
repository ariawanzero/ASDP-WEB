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

@Component({
  selector: 'asdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  loginForm: FormGroup;
  responseAuth: Authentication;

  constructor(
    private router:Router,
    private authServ: AuthenticationService,
    private localStorageServ: LocalStorageService,
    private globalMessageServ: GlobalMessageService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.checkAuth();
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  private checkAuth(): void {
    if(this.authServ.checkCredentials()) this.cookieService.delete('key');
  }

  loginUser() {
    if(this.loginForm.valid) {
      this.blockUI.start();
      this.authServ.getAccess(this.loginForm.getRawValue()).subscribe(
        resp => {
          this.responseAuth = resp;
        }, (err) => {
          this.blockUI.stop();
          this.globalMessageServ.changeMessage(err);
        }, () => {
          this.localStorageServ.clearAll();
          this.generateKey();
          this.generateMenu();
          this.generateClient();

          this.blockUI.stop();

          this.goToDashboard();
        }
      )
    }
  }

  onForgetPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  private generateMenu(): void {
    let menuList = new Array();
    MENU.forEach(val => {
      let idx: number = this.responseAuth.menu.findIndex(item => item.parent === val.code);
      if(idx >= 0) {
        let parent: Menu = new Menu(val.code, val.value, val.icon);
        parent.menuItem = this.responseAuth.menu.filter(item => item.parent === val.code);
        
        if(parent.menuItem.length >= 0) menuList.push(parent);
      }
    })

    if(menuList.length > 0) this.localStorageServ.insertValue('menu', JSON.stringify(menuList));
  }

  private generateKey(): void {
    let key: string = this.responseAuth.token_type + ' ' + this.responseAuth.access_token;
    let expire: Date = new Date();
    expire.setSeconds(new Date().getSeconds() + this.responseAuth.expires_in);

    this.cookieService.set('key', key, expire);
  }

  private generateClient(): void {
    this.localStorageServ.insertValue('client-email', this.responseAuth.clientEmail);
    this.localStorageServ.insertValue('client-name', this.responseAuth.clientName);
    if(this.responseAuth.clientJabatan != null){
      this.localStorageServ.insertValue('client-jabatan', this.responseAuth.clientJabatan);
    }if(this.responseAuth.clientExpiredDate != null){
      this.localStorageServ.insertValue('client-expired-date', this.responseAuth.clientExpiredDate);
    }
    this.localStorageServ.insertValue('client-role-name', this.responseAuth.clientRoleName);
  }

  private goToDashboard(): void { 
    this.router.navigate(['/home/dashboard']);
  }
}
