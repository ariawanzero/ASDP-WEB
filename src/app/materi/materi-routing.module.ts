import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriListComponent } from './list/materi-list.component';
import { MateriUploadComponent } from './upload/materi-upload.component';

const routes: Routes = [
  {
    path: '',
    component: MateriListComponent
  }, {
    path: 'upload/:id',
    component: MateriUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriRoutingModule { }
