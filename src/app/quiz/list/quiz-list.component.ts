import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ModalService } from '../../shared/service/modal.service';

import { QuizService } from '../quiz.service';

import { QuizFilter, Quiz } from '../quiz';

declare let jQuery: any;

@Component({
  selector: 'asdp-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  filter: QuizFilter;
  page: PagingData<Quiz[]>
  urlFile: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private modalServ: ModalService,
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService) { }

  ngOnInit() {
    this.filter = new QuizFilter();

    this.getQuizList();
  }

  private getQuizList(): void {
    this.blockUI.start();
    this.quizService.getFilteredQuiz(this.filter).subscribe(
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
    this.getQuizList();
  }

  onCollapse(id: string): void {
    let state: boolean = JSON.parse(jQuery(id).attr("aria-expanded"));
    
    jQuery('.collapse').collapse('hide')
    !state ? jQuery(id).collapse('show') : jQuery(id).collapse('hide')
    jQuery(id).attr("aria-expanded", !state);
  }

  onStart(id: string): void {
    this.confirmServ.activate(ConfirmationMessage.ANSWER, TitleModal.CONFIRM)
      .then(result => {
        if (result) { this.router.navigate(['answer', id], { relativeTo: this.route }); }
      });
  }

  onPreview(url: string): void {
    this.urlFile = url;
    console.log(url);
    this.modalServ.openModal("modal-file");
  }
}
