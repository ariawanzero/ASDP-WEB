import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizListComponent } from './list/quiz-list.component';
import { QuizAnswerComponent } from './answer/quiz-answer.component';
import { QuizResultComponent } from './result/quiz-result.component';

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent
  }, {
    path: 'answer/:id',
    component: QuizAnswerComponent
  }, {
    path: 'list',
    component: QuizListComponent
  }, {
    path: 'result',
    component: QuizResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
