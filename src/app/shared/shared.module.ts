import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarTopComponent } from './component/navbar-top/navbar-top.component';
import { NavbarSidebarComponent } from './component/navbar-sidebar/navbar-sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { PagingComponent } from './component/paging/paging.component';

import { SidebarService } from './service/sidebar.service';
import { ResponseService } from './service/response.service';
import { LocalStorageService } from './service/local-storage.service';
import { AuthenticationService } from './service/authentication.service';
import { RouterGuardService } from './service/router-guard.service';
import { ModalService } from './service/modal.service';

import { DateFormatPipe } from './pipe/date-format.pipe';
import { DateTimeFormatPipe } from './pipe/date-time-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarTopComponent,
    NavbarSidebarComponent,
    FooterComponent,
    PagingComponent,

    DateFormatPipe,
    DateTimeFormatPipe
  ], 
  providers: [ 
    SidebarService,
    ResponseService,
    LocalStorageService,
    AuthenticationService,
    RouterGuardService,
    ModalService
  ],
  exports: [
    NavbarTopComponent,
    NavbarSidebarComponent,
    FooterComponent,
    PagingComponent,

    DateFormatPipe,
    DateTimeFormatPipe
  ]
})
export class SharedModule { }
