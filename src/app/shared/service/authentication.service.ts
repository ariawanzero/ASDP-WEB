import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private localStorageServ: LocalStorageService
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
    let currentKey: string = this.localStorageServ.getValue('key');

    const AUTH = new HttpHeaders()
      .set('Authorization', currentKey);

    return this.http.post('/oauth/logout', {}, { headers: AUTH })
            .pipe(
              map(resp => { return resp }),
              catchError(this.handleError)
            )
  }

  private handleError(error: HttpErrorResponse) {
    let errMsg = '';
    errMsg = `Error: ${error.error.error}, Message: ${error.error.error_description}`;
    
    return throwError(errMsg);
  }
}
