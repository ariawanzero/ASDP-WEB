import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,

    AppRoutingModule,
    SharedModule,

    BlockUIModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
