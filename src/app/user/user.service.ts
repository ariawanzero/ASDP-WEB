import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { UserFilter, User, UserDetail, UserHistoryFilter, UserHistory } from './user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredUser(value: UserFilter): Observable<PagingData<User[]>> { 
    return this.http.post(('/user/searchUser'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getFilteredUserHistory(value: UserHistoryFilter): Observable<PagingData<UserHistory[]>> {
    return this.http.post(('/user/searchHistoryLogin'), value)
      .pipe (
        map(this.respService.extractDataPaging)
      )
  }

  getDetailUser(value: any): Observable<UserDetail> {
    return this.http.post(('/user/findUserDetail'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

  saveUser(value: UserDetail): Observable<any> { 
    return this.http.post(('/user/saveUser'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }

  getCountHistLogin(value: any): Observable<UserDetail> {
    return this.http.post(('/user/countTodayLogin'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }
}
