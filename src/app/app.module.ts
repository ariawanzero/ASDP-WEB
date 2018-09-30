import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
