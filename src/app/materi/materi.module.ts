import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { MateriRoutingModule } from './materi-routing.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { MateriService } from './materi.service';
import { ModalService } from '../shared/service/modal.service';

import { MateriListComponent } from './list/materi-list.component';
import { MateriDetailComponent } from './modal/materi-detail/materi-detail.component';
import { MateriUploadComponent } from './upload/materi-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MateriRoutingModule,

    SharedModule
  ],
  declarations: [
    MateriListComponent,
    MateriDetailComponent,
    MateriUploadComponent
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
