import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseService } from '../shared/service/response.service';

import { ChangePassword } from './forgot';

@Injectable()
export class ForgotPasswordService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  forgotPassword(value: ChangePassword): Observable<any> { 
    return this.http.post(('/forgot/forgotPassword'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }
}
