import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { MateriRoutingModule } from './materi-routing.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { MateriService } from './materi.service';
import { ModalService } from '../shared/service/modal.service';

import { MateriListComponent } from './list/materi-list.component';
import { MateriDetailComponent } from './detail/materi-detail.component';
import { MateriUploadComponent } from './upload/materi-upload.component';
import { MateriFileComponent } from './modal/materi-file/materi-file.component';
import { MateriQuestionComponent } from './question/materi-question.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QuillModule,
    MateriRoutingModule,

    SharedModule
  ],
  declarations: [
    MateriListComponent,
    MateriDetailComponent,
    MateriUploadComponent,
    MateriFileComponent,
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
    ModalService
  ]
})
export class MateriModule { }
