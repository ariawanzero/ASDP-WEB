import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
