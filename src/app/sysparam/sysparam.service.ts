import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';
import { SysParamFilter, SysParam } from './sysparam';


@Injectable()
export class SysParamService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredSysParam(value: SysParamFilter): Observable<PagingData<SysParam[]>> { 
    return this.http.post(('/sysparam/searchParam'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getDetailSysParam(value: any): Observable<SysParam> {
    return this.http.post(('/sysparam/findParamDetail'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

  saveSysParam(value: SysParam): Observable<any> { 
    return this.http.post(('/sysparam/saveParam'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }
}
