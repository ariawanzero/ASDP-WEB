import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private localStorageServ: LocalStorageService,
    private cookieService: CookieService
  ) { }

  getAccess(data: any): Observable<any>{
    const BODY = new HttpParams()
      .set('username', data.username)
      .set('password', data.password)
      .set('grant_type', 'password');

    const OPTIONS = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic '+ btoa("infoasdp-client:infoasdp-secret"));
    
    return this.http.post('/oauth/token', BODY.toString(), { headers : OPTIONS })
            .pipe(
              map(resp => { return resp }),
              catchError(this.handleError)
            )
  }

  removeAccess(): Observable<any> {
    let currentKey: string = this.cookieService.get('key');

    const AUTH = new HttpHeaders()
      .set('Authorization', currentKey);

    return this.http.post('/oauth/logout', {}, { headers: AUTH })
            .pipe(
              map(resp => { return resp }),
              catchError(this.handleError)
            )
  }

  checkCredentials(): boolean {
    return this.cookieService.get('key') ? true : false;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if(error.status < 500) {
      errMsg = `Error: ${error.error.error}, Message: ${error.error.error_description}`;
    } else {
      errMsg = error.statusText;
    }
    
    return throwError(errMsg);
  }
}
