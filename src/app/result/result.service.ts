import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { ResultQuizFilter, ResultQuiz } from './result';

@Injectable()
export class ResultService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }  

  getFilteredResultQuiz(value: ResultQuizFilter): Observable<PagingData<ResultQuiz[]>> { 
    return this.http.post(('/result/searchResultQuiz'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }
}
