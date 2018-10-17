import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';

import { SharedModule } from '../shared/shared.module';

import { UserService } from './user.service';

import { HttpErrorInterceptor } from '../http-interceptor/http-error-interceptor';

import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { Oauth2AuthenticationInterceptor } from '../http-interceptor/oauth2-authentication-interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,

    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
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
      multi: true
    },
    UserService
  ]
})

export class UserModule { }