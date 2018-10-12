import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterGuardService } from '../shared/service/router-guard.service';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

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
    ],
    canActivate: [RouterGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
