import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentListComponent } from './list/document-list.component';
import { DocumentInputComponent } from './input/document-input.component';
import { DocumentUploadComponent } from './upload/document-upload.component';
import { DocumentDetailComponent } from './detail/document-detail.component';
import { DocumentPendingComponent } from './pending/document-pending.component';
import { DocumentHistoryComponent } from './history/document-history.component';
import { DocumentDetailHistoryComponent } from './detailHistory/document-detail-history.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent
  }, {
    path: 'pending',
    component: DocumentPendingComponent
  }, {
    path: 'history',
    component: DocumentHistoryComponent
  }, {
    path: 'detailHistory/:id',
    component: DocumentDetailHistoryComponent
  }, {
    path: 'add',
    data: { state: 'add' },
    component: DocumentInputComponent
  }, {
    path: 'addUser',
    data: { state: 'addUser' },
    component: DocumentInputComponent
  },{
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
