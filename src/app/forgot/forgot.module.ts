import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ForgotComponent } from './forgot.component';
import { ForgotPasswordService } from './forgot.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ForgotComponent
  ],
  providers: [
    ForgotPasswordService
  ],
  exports: [
    ForgotComponent
  ]
})
export class ForgotModule { }
