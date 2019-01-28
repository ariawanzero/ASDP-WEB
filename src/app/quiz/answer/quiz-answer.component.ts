import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

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
  finishQuiz: boolean = false;

  idx: number = 0;
  questionCount: number;
  answeredCount: number = 0;
  cd: string;
  timers: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.setForm();
    this.getIDQuizFromParamater();
  }

  private setForm(): void {
    this.answerForm = new FormGroup({
      choice: new FormControl('', [Validators.required]),
    });
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
        this.router.navigate(['../..'], { relativeTo: this.route });
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
    this.answeredCount = this.quizes.questions.filter(data => data.answerUser && data.answerUser != ' ').length;

    this.setValueQuestion();
  }

  private setValueQuestion(): void {
    this.answerForm.patchValue({
      choice: this.question.answerUser ? this.question.answerUser : ''
    });

    if(!this.timers) this.setIntervalStart();
    this.setProgressQuiz();
  }

  private setIntervalStart(): void {
    let countDownDate: number = new Date(this.quizes.endDateQuiz).getTime();
        this.timers = setInterval(() => {
          let now: number = new Date().getTime();
          let distance: number = countDownDate - now;

          if (distance < 0) {
            clearInterval(this.timers);
            this.globalMsgServ.changeMessage("Waktu Mengerjakan Quiz Telah Habis");
            this.prepSaveQuiz();
          } else {
            let hours: number = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes: number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

            this.cd = hours + "h " + minutes + "m " + seconds + "s ";
          }
        }, 1000);
  }

  private setProgressQuiz(): void {
    let count: number = 100 / this.quizes.questions.length
    this.quizes.questions.forEach(
      (data) => {
        data.width = count.toString() + "%";
      }
    )
  }

  onPrev(): void {
    this.idx -= 1;
    this.saveAnswer();
  }

  onNext(): void {
    this.idx += 1;
    this.saveAnswer();
  }

  onSpecificQuestion(qz: number): void {
    this.idx = qz + 1;
    this.saveAnswer();
  }

  

  onFinish(): void {
    this.confirmServ.activate(ConfirmationMessage.FINISH, TitleModal.CONFIRM)
      .then(result => {
        this.prepSaveQuiz();
      });
  }

  private saveAnswer(): void {
    let answer : any = this.answerForm.getRawValue();
    if(answer.choice) {
      this.question.answerUser = answer.choice;
      this.answerQuiz();
    } else {
      this.getQuizQuestion();
    }
  }

  private prepSaveQuiz(): void {
    this.finishQuiz = true;
    this.question.finish = true;

    this.saveAnswer();
  }

  private answerQuiz(): void {
    this.blockUI.start();
    this.quizService.sendAnswerQuiz(this.question).subscribe(
      resp => {
        this.quizes = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.finishQuiz ? this.onGoToResult() : this.getQuizQuestion();
      }
    )
  }

  private onGoToResult(): void { this.router.navigate(['../result'], { relativeTo: this.route }) }
}
