import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { DocumentRoutingModule } from './document-routing.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { ModalService } from '../shared/service/modal.service';
import { DocumentService } from './document.service';

import { DocumentListComponent } from './list/document-list.component';
import { DocumentInputComponent } from './input/document-input.component';
import { DocumentUploadComponent } from './upload/document-upload.component';
import { DocumentDetailComponent } from './detail/document-detail.component';
import { DocumentPendingComponent } from './pending/document-pending.component';
import { SysParamService } from '../shared/service/sysparam.service';
import { DocumentHistoryComponent } from './history/document-history.component';
import { DocumentDetailHistoryComponent } from './detailHistory/document-detail-history.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DocumentRoutingModule,

    QuillModule,
    NgSelectModule,

    SharedModule
  ],
  declarations: [
    DocumentListComponent,
    DocumentInputComponent,
    DocumentUploadComponent,
    DocumentDetailComponent,
    DocumentPendingComponent,
    DocumentHistoryComponent,
    DocumentDetailHistoryComponent
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
    DocumentService,
    SysParamService
  ]
})
export class DocumentModule { }
