import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';
import { DasboardFilter } from './dashboard';
import { Document } from '../document/document';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredDocumentAdvanced(value: DasboardFilter): Observable<PagingData<Document[]>> { 
    return this.http.post(('/document/dashboardSearch'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }
}
