import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { SysParamService } from './sysparam.service';
import { SysParamListComponent } from './list/sysparam-list.component';
import { SysParamDetailComponent } from './detail/sysparam-detail.component';
import { SysParamRoutingModule } from './sysparam-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SysParamRoutingModule,

    SharedModule
  ],
  declarations: [
    SysParamListComponent,
    SysParamDetailComponent,
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
    SysParamService
  ]
})

export class SysParamModule { }