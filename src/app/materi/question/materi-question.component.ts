import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { SimpleObject } from '../../shared/class/simple-object';

import { ANSWER } from '../../shared/constant/answer';

import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';

@Component({
  selector: 'asdp-materi-question',
  templateUrl: './materi-question.component.html',
  styleUrls: ['./materi-question.component.css']
})
export class MateriQuestionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;
  answer: SimpleObject[] = ANSWER;

  isAdd: boolean;
  questionId: string;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private materiServ: MateriService
  ) { }

  ngOnInit() {
    this.isAdd = true;
    this.setForm();
  }

  private setForm(): void {
    this.detailForm = new FormGroup({
      id: new FormControl(''),
      question: new FormControl('', [Validators.required]),
      choiceA: new FormControl('', [Validators.required]),
      choiceB: new FormControl('', [Validators.required]),
      choiceC: new FormControl('', [Validators.required]),
      choiceD: new FormControl('', [Validators.required]),
      answer: new FormControl([], [Validators.required]),
    });
  }

  private getListQuestion(): void {

  }

  private saveQuestion(): void {
    console.log(this.detailForm.getRawValue());
    // this.blockUI.start();
    // this.materiServ.saveMateriHeader(this.mapMateri(this.detailForm.getRawValue())).subscribe(
    //   resp => {
    //     this.response = resp;
    //   }, (err) => {
    //     this.blockUI.stop();
    //     this.globalMsgServ.changeMessage(err);
    //   }, () => {
    //     this.blockUI.stop();
    //     this.checkResultAction();
    //   }
    // );
  }

  private checkResultAction(): void {
    if(this.response.responseCode !== "00") {
      this.globalMsgServ.changeMessage(this.response.responseDesc);
    } else {
      this.onClear();
    }
  }

  onSubmit(): void {
    switch (this.task) {
      case Task.Save:
        this.confirmServ.activate(ConfirmationMessage.SAVE, TitleModal.CONFIRM)
          .then(result => {
            if (result) { this.saveQuestion(); }
          });
        break;
      default:
        this.globalMsgServ.changeMessage('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  onSave(): void { this.task = Task.Save; }

  onBack(): void { this.router.navigate(['../' ], { relativeTo: this.route }); }

  onClear(): void {
    this.detailForm.reset()
  }
}
