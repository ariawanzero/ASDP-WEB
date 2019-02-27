import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../shared/class/confirmation-message';
import { TitleModal } from '../shared/class/title-modal';
import { PasswordValidator } from '../shared/validator/password.validator';

import { CommonResponseStatus } from '../shared/class/common-response-status';
import { Task } from '../shared/enum/task.enum';

import { ConfirmationDialogService } from '../shared/service/confirmation-dialog.service';
import { LocalStorageService } from '../shared/service/local-storage.service';

import { ChangePasswordService } from './change-password.service';

import { ChangePassword } from './change-password';

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
    private confirmServ: ConfirmationDialogService,
    private localStorageServ: LocalStorageService,
    private changePasswordServ: ChangePasswordService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  private setForm(): void {
    this.passwordForm = new FormGroup({
      username: new FormControl(this.localStorageServ.getValue('client-email')),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7), PasswordValidator.passwordPattern]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(7), PasswordValidator.passwordRetypeCheck])
    })
  }

  private mapChangePw(data: any): ChangePassword {
    let result: ChangePassword = new ChangePassword();
    result = Object.assign({}, data);

    return result;
  }

  private changePassword(): void {
    this.blockUI.start();
    this.changePasswordServ.changePassword(this.mapChangePw(this.passwordForm.getRawValue())).subscribe(
      resp => {
        this.response = resp;
      }, (err) => {
        this.blockUI.stop();
        console.log(err);
      }, () => {
        this.checkResultAction();
        this.blockUI.stop();
      }
    )
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
    this.router.navigate(['/home/dashboard']);
  }

  onSave(): void { this.task = Task.Save; }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) this.onGoToList(); 
      }
    )
  }
}
