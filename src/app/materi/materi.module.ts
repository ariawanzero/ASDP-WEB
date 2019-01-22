import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { MateriRoutingModule } from './materi-routing.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { MateriService } from './materi.service';

import { MateriListComponent } from './list/materi-list.component';
import { MateriDetailComponent } from './detail/materi-detail.component';
import { MateriUploadComponent } from './upload/materi-upload.component';
import { MateriQuestionComponent } from './question/materi-question.component';
import { SysParamService } from '../shared/service/sysparam.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MateriRoutingModule,

    QuillModule,
    NgSelectModule,

    SharedModule
  ],
  declarations: [
    MateriListComponent,
    MateriDetailComponent,
    MateriUploadComponent,
    MateriQuestionComponent
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
    MateriService,
    SysParamService
  ]
})
export class MateriModule { }
