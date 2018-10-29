import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserHistoryComponent } from './history/user-history.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }, {
    path: 'add',
    data: { state: 'add' },
    component: UserDetailComponent
  }, {
    path: 'edit/:id',
    data: { state: 'edit' },
    component: UserDetailComponent
  }, {
    path: 'history',
    component: UserHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
