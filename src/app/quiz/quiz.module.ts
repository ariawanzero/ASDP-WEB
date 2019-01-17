import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { QuizRoutingModule } from './quiz-routing.module';

import { SharedModule } from '../shared/shared.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { QuizService } from './quiz.service';

import { QuizListComponent } from './list/quiz-list.component';
import { QuizAnswerComponent } from './answer/quiz-answer.component';
import { QuizResultComponent } from './result/quiz-result.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    QuizRoutingModule,

    SharedModule
  ],
  declarations: [
    QuizListComponent,
    QuizAnswerComponent,
    QuizResultComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Oauth2AuthenticationInterceptor,
      multi: true,
      deps: [ CookieService ]
    },
    QuizService
  ]
})
export class QuizModule { }
