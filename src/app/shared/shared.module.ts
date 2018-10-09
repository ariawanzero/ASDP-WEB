import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarTopComponent } from './component/navbar-top/navbar-top.component';
import { NavbarSidebarComponent } from './component/navbar-sidebar/navbar-sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { PagingComponent } from './component/paging/paging.component';

import { SidebarService } from './service/sidebar.service';
import { ResponseService } from './service/response.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarTopComponent,
    NavbarSidebarComponent,
    FooterComponent,
    PagingComponent
  ], 
  providers: [ 
    SidebarService,
    ResponseService
  ],
  exports: [
    NavbarTopComponent,
    NavbarSidebarComponent,
    FooterComponent,
    PagingComponent
  ]
})
export class SharedModule { }
