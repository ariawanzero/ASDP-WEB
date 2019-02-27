import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarTopComponent } from './component/navbar-top/navbar-top.component';
import { NavbarSidebarComponent } from './component/navbar-sidebar/navbar-sidebar.component';
import { NavbarHeaderComponent } from './component/navbar-header/navbar-header.component';
import { NavbarMenuComponent } from './component/navbar-menu/navbar-menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { PagingComponent } from './component/paging/paging.component';
import { ModalFileComponent } from './component/modal-file/modal-file.component';

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
    NavbarHeaderComponent,
    NavbarMenuComponent,
    FooterComponent,
    PagingComponent,
    ModalFileComponent,

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
    NavbarHeaderComponent,
    NavbarMenuComponent,
    FooterComponent,
    PagingComponent,
    ModalFileComponent,

    DateFormatPipe,
    DateTimeFormatPipe
  ]
})
export class SharedModule { }
