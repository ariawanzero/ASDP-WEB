import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { ResultRoutingModule } from './result-routing.module';

import { SharedModule } from '../shared/shared.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { ResultService } from './result.service';

import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    ResultRoutingModule,

    SharedModule
  ],
  declarations: [
    QuizComponent
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
    ResultService
  ]
})
export class ResultModule { }
