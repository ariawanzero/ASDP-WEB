import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseService } from './response.service';

@Injectable()
export class SysParamService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getSysParamByType(value: any): Observable<any> {
    return this.http.post(('/sysparam/findParamByType'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

}
