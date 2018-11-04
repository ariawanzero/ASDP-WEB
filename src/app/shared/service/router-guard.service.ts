import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouterGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authServ: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(this.authServ.checkCredentials() === false) this.router.navigate(['/login']);
    return Observable.create((obs)=> {
      obs.next(this.authServ.checkCredentials());
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(this.authServ.checkCredentials() === false) this.router.navigate(['/login']);
    return Observable.create((obs)=> {
      obs.next(this.authServ.checkCredentials());
    });
  }
}
