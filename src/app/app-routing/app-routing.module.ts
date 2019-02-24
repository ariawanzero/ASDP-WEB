import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterGuardService } from '../shared/service/router-guard.service';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ForgotComponent } from '../forgot/forgot.component';

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
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule',
      }, {
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
        loadChildren: 'src/app/document/document.module#DocumentModule'
      }, { 
        path: 'quiz',
        loadChildren: 'src/app/quiz/quiz.module#QuizModule'
      }, {
        path: 'sysparam',
        loadChildren: 'src/app/sysparam/sysparam.module#SysParamModule'
      }, {
        path: 'result',
        loadChildren: 'src/app/result/result.module#ResultModule'
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
