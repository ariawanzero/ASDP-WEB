import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentListComponent } from './list/document-list.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent
  }, {
    path: 'add',
    data: { state: 'add' }
  }, {
    path: 'edit/:id',
    data: { state: 'edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
