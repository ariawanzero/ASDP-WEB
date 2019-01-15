import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';

import { QuizFilter, Quiz, QuizResult, QuizQuestion } from './quiz';

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

  getQuestionQuiz(value: string): Observable<QuizResult> {
    return this.http.post(('/quiz/startQuiz'), { id: value })
      .pipe(
        map(this.respService.extractData)
      )
  }

  sendAnswerQuiz(value: QuizQuestion): Observable<QuizResult> {
    return this.http.post(('/quiz/answerQuiz'), value )
      .pipe(
        map(this.respService.extractData)
      )
  }

  getResultQuiz(value: QuizFilter): Observable<PagingData<QuizResult[]>> {
    return this.http.post(('/quiz/resultQuiz'), value)
      .pipe (
        map(this.respService.extractDataPaging)
      )
  }
}
