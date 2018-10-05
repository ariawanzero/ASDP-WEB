import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarTopComponent } from './component/navbar-top/navbar-top.component';
import { NavbarSidebarComponent } from './component/navbar-sidebar/navbar-sidebar.component';

import { SidebarService } from './service/sidebar.service';

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
    NavbarSidebarComponent
  ], 
  providers: [ 
    SidebarService
  ],
  exports: [
    NavbarTopComponent,
    NavbarSidebarComponent
  ]
})
export class SharedModule { }
