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
        loadChildren: 'src/app/user/user.module#UserModule',
      }, {
        path: 'change-password',
        loadChildren: 'src/app/change-password/change-password.module#ChangePasswordModule'
      }, {
        path: 'materi',
        loadChildren: 'src/app/materi/materi.module#MateriModule'
      }, {
        path: 'document',
        data: { pending: false },
        loadChildren: 'src/app/document/document.module#DocumentModule'
      }, {
        path: 'document-pending',
        data: { pending: true },
        loadChildren: 'src/app/document/document.module#DocumentModule'
      }
    ],
    canActivate: [RouterGuardService],
    canActivateChild: [RouterGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
