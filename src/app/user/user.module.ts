import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { UserService } from './user.service';

import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  providers: [
    UserService
  ],
  exports: [
    UserListComponent,
    UserDetailComponent
  ]
})
export class UserModule { }
