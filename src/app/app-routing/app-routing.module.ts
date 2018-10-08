import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

import { UserListComponent } from '../user/list/user-list.component';
import { UserDetailComponent } from '../user/detail/user-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        loadChildren: 'src/app/user/user.module#UserModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
