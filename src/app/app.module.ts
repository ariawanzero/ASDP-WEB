import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';

import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ConfirmationDialogComponent } from './shared/component/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/service/confirmation-dialog.service';

@NgModule({
  imports: [
    BrowserModule,

    AppRoutingModule,
    SharedModule,

    LoginModule,

    BlockUIModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
