import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Authentication } from '../shared/class/authentication';
import { Menu } from '../shared/class/menu';
import { MENU } from '../shared/constant/menu';
import { LocalStorageService } from '../shared/service/local-storage.service';

import { AuthenticationService } from '../shared/service/authentication.service';

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
    private authServ: AuthenticationService,
    private localStorageServ: LocalStorageService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  loginUser() {
    this.blockUI.start();
    this.authServ.getAccess(this.loginForm.getRawValue()).subscribe(
      resp => {
        this.responseAuth = resp;
      }, (err) => {
        console.log(err);
        this.blockUI.stop();
      }, () => {
        this.generateMenu();
        this.generateKey();

        this.blockUI.stop();

        this.goToDashboard();
      }
    )
  }

  private generateMenu(): void {
    let menuList = new Array();
    MENU.forEach(val => {
      let parent: Menu = new Menu(val.code, val.value, val.icon);
      parent.menuItem = this.responseAuth.menu.filter(item => item.parent === val.code);

      menuList.push(parent);
    })
    this.localStorageServ.insertValue('menu', JSON.stringify(menuList));
  }

  private generateKey(): void {
    let key = this.responseAuth.token_type + ' ' + this.responseAuth.access_token;
    this.localStorageServ.insertValue('key', key);
  }

  private goToDashboard(): void {
    this.router.navigate(['home']);
  }
}
