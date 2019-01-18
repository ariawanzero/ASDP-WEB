import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentListComponent } from './list/document-list.component';
import { DocumentInputComponent } from './input/document-input.component';
import { DocumentUploadComponent } from './upload/document-upload.component';
import { DocumentDetailComponent } from './detail/document-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent
  }, {
    path: 'add',
    data: { state: 'add' },
    component: DocumentInputComponent
  }, {
    path: 'edit/:id',
    data: { state: 'edit' },
    component: DocumentInputComponent
  }, {
    path: 'upload/:id',
    data: { state: 'upload' },
    component: DocumentUploadComponent
  }, {
    path: 'detail/:id',
    data: { state: 'detail' },
    component: DocumentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
