import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriListComponent } from './list/materi-list.component';
import { MateriDetailComponent } from './detail/materi-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MateriListComponent
  }, {
    path: 'add',
    component: MateriDetailComponent
  }, {
    path: 'upload/:id',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriRoutingModule { }
