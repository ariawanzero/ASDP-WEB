import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }, 
  {
    path: 'add',
    data: { state: 'add' },
    component: UserDetailComponent
  },
  {
    path: 'edit/:id',
    data: { state: 'edit' },
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
