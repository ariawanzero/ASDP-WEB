import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { MateriFilter, Materi } from './materi';

@Injectable()
export class MateriService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredMateri(value: MateriFilter): Observable<PagingData<Materi[]>> { 
    return this.http.post(('/materi/searchMateri'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getDetailMateri(value: any): Observable<any> {
    return this.http.post(('/materi/findMateriDetail'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

  saveMateriHeader(value: Materi): Observable<any> { 
    return this.http.post(('/materi/saveMateriHeader'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }
}
