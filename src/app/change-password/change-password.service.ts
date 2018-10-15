import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseService } from '../shared/service/response.service';

import { ChangePassword } from './change-password';

@Injectable()
export class ChangePasswordService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  changePassword(value: ChangePassword): Observable<any> { 
    return this.http.post(('/user/changePassword'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }
}
