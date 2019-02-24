import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password.component';

import { ForgotPasswordService } from './forgot-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  providers: [
    ForgotPasswordService
  ],
  exports: [
    ForgotPasswordComponent
  ]
})

export class ForgotModule { }