import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

import { DashboardService } from './dashboard.service';

import { DashboardComponent } from './dashboard.component';
import { SysParamService } from '../shared/service/sysparam.service';
import { UserService } from '../user/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,

    DashboardRoutingModule,

    QuillModule,
    NgSelectModule,

    SharedModule
  ],
  declarations: [
    DashboardComponent
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
    DashboardService,
    SysParamService,
    UserService
  ]
})
export class DashboardModule { }
