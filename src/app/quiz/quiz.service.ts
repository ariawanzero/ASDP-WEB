import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { QuizFilter, Quiz } from './quiz';

@Injectable()
export class QuizService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  getFilteredQuiz(value: QuizFilter): Observable<PagingData<Quiz[]>> { 
    return this.http.post(('/quiz/searchQuiz'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }
}
