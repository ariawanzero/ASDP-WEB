import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { UserFilter, User, UserDetail } from './user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredUser(value: UserFilter): Observable<PagingData<User[]>> { 
    return this.http.post(('/user/searchUser'), value)
      .pipe(
        map(this.respService.extractDataPaging),
        catchError(this.respService.errorHandling)
      )
  }

  getSingleUser(value: any): Observable<UserDetail> {
    return this.http.post(('/user/findUserDetail'), value)
      .pipe(
        map(this.respService.extractData),
        catchError(this.respService.errorHandling)
      )
  }

  saveUser(value: UserDetail): Observable<any> { 
    return this.http.post(('/user/saveUser'), value)
      .pipe(
        map(this.respService.extractData),
        catchError(this.respService.errorHandling)
      )
  }  
}
