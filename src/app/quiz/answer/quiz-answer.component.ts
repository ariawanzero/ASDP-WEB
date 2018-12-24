import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ModalService } from '../../shared/service/modal.service';

import { QuizService } from '../quiz.service';

import { QuizResult, QuizQuestion } from '../quiz';

@Component({
  selector: 'asdp-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.css']
})
export class QuizAnswerComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  answerForm: FormGroup;

  quizId: string;
  quizes: QuizResult;
  question: QuizQuestion;

  idx: number = 0;
  questionCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private modalServ: ModalService,
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.getIDQuizFromParamater();
    this.setForm();
  }

  private getIDQuizFromParamater(): void {
    this.route.params.subscribe(
      params => { 
        this.quizId = params['id'];
        this.getQuestions();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getQuestions(): void {
    this.blockUI.start();
    this.quizService.getQuestionQuiz(this.quizId).subscribe(
      resp => {
        this.quizes = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.getQuizQuestion();
      }
    )
  }

  private getQuizQuestion(): void {
    this.quizes.questions = this.quizes.questions.filter(data => data.valid == 1);
    this.questionCount = this.quizes.questions.length - 1;
    this.question = this.quizes.questions.filter(data => data.valid == 1)[this.idx];
  }

  private setForm(): void {
    this.answerForm = new FormGroup({
      choice: new FormControl('', [Validators.required]),
    });
  }
}
