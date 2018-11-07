import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriListComponent } from './list/materi-list.component';
import { MateriUploadComponent } from './upload/materi-upload.component';
import { MateriQuestionComponent } from './question/materi-question.component';
import { MateriDetailComponent } from './detail/materi-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MateriListComponent
  }, {
    path: 'add',
    data: { state: 'add' },
    component: MateriDetailComponent
  }, {
    path: 'edit/:id',
    data: { state: 'edit' },
    component: MateriDetailComponent
  }, {
    path: 'upload/:id',
    component: MateriUploadComponent
  }, {
    path: 'question/:id',
    component: MateriQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriRoutingModule { }
