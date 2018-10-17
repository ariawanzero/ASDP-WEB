import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor(
    private authServ: AuthenticationService
  ) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> {
    return Observable.create((obs)=> {
      obs.next(this.authServ.checkCredentials());
    });
  }
}
