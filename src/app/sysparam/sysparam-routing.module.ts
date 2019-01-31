import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysParamDetailComponent } from './detail/sysparam-detail.component';
import { SysParamListComponent } from './list/sysparam-list.component';

const routes: Routes = [
  {
    path: '',
    component: SysParamListComponent
  }, {
    path: 'add',
    data: { state: 'add' },
    component: SysParamDetailComponent
  }, {
    path: 'edit/:code',
    data: { state: 'edit' },
    component: SysParamDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysParamRoutingModule { }
