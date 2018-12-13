import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { CommonResponseStatus } from '../../shared/class/common-response-status';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { QuizService } from '../quiz.service';

import { Quiz } from '../quiz';

declare let jQuery: any;

@Component({
  selector: 'asdp-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  page: PagingData<Quiz[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService) { }

  ngOnInit() {
    this.getListQuiz();
  }

  private getListQuiz(): void {
    this.blockUI.start();
    this.quizService.getFilteredQuiz().subscribe(
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

  onCollapse(id: string): void {
    let state: boolean = JSON.parse(jQuery(id).attr("aria-expanded"));
    
    jQuery('.collapse').collapse('hide')
    !state ? jQuery(id).collapse('show') : jQuery(id).collapse('hide')
    jQuery(id).attr("aria-expanded", !state);
  }
}
