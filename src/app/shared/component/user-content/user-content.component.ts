import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CookieService } from 'ngx-cookie-service';

import { LocalStorageService } from '../../service/local-storage.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'asdp-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css']
})
export class UserContentComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  user: string;
  jabatan: string;
  expiredDate: string;
  role: string;

  constructor(
    private authServ: AuthenticationService,
    private localStorageServ: LocalStorageService,
    private router:Router,
    private cookieService: CookieService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.localStorageServ.getValue('client-name');
    this.jabatan = this.localStorageServ.getValue('client-jabatan');
    this.expiredDate = this.localStorageServ.getValue('client-expired-date');
    this.role = this.localStorageServ.getValue('client-role-name');
  }

  goSignOut(): void {
    this.blockUI.start();
    this.authServ.removeAccess().subscribe(
      resp => {
        this.blockUI.stop();
      }, (err) => {
        this.blockUI.stop();
        console.log(err);
      }, () => {
        this.cookieService.deleteAll();
        this.localStorageServ.clearAll();
        this.router.navigate(['']);
      }
    )
  }

  onChangePassword(): void { 
    this.router.navigate(['change-password'], {
      relativeTo: this.activatedRoute, skipLocationChange: false
    });
  }

}
