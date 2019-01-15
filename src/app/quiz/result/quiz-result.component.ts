import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { QuizService } from '../quiz.service';

import { QuizFilter, QuizResult } from '../quiz';

@Component({
  selector: 'asdp-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  filter: QuizFilter;
  page: PagingData<QuizResult[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.filter = new QuizFilter();

    this.getResultQuizList();
  }

  private getResultQuizList(): void {
    this.blockUI.start();
    this.quizService.getResultQuiz(this.filter).subscribe(
      resp => {
        this.page = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getResultQuizList();
  }
}
