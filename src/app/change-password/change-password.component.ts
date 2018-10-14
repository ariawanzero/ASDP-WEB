import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../shared/class/confirmation-message';
import { TitleModal } from '../shared/class/title-modal';

import { CommonResponseStatus } from '../shared/class/common-response-status';
import { Task } from '../shared/enum/task.enum';

import { ConfirmationDialogService } from '../shared/service/confirmation-dialog.service';

@Component({
  selector: 'asdp-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;

  passwordForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  private setForm(): void {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  private changePassword(): void {
  }

  private checkResultAction(): void {
    if(this.response.responseCode !== "00") {
      console.log(this.response.responseDesc);
    } else {
      this.onGoToList();
    }
  }

  onSubmit(): void {
    switch (this.task) {
      case Task.Save:
        this.confirmServ.activate(ConfirmationMessage.CHANGE, TitleModal.CONFIRM)
          .then(result => {
            if (result) { this.changePassword(); }
          });
        break;
      default:
        console.log('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  onGoToList(): void {
    this.router.navigate(['../' ], { relativeTo: this.route });
  }

  onSave(): void { this.task = Task.Save; }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) { this.onGoToList(); }
      }
    )
  }
}
