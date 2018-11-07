import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ROLE } from '../../shared/constant/role';
import { JABATAN } from '../../shared/constant/jabatan';
import { DIVISI } from '../../shared/constant/divisi';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { SimpleObject } from '../../shared/class/simple-object';
import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { UserService } from '../user.service';

import { UserDetail } from '../user';

@Component({
  selector: 'asdp-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  role: SimpleObject[] = ROLE;
  jabatan: SimpleObject[] = JABATAN;
  divisi: SimpleObject[] = DIVISI;

  task: Task = Task.None;

  isAdd: boolean;
  userId: string;
  user: UserDetail;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    let state = this.route.snapshot.data['state'];
    this.checkStateAction(state);
  }

  private checkStateAction(action: string): void {
    this.isAdd = action === "add" ? true : false;
    this.setForm();
  }

  private setForm(): void {
    let defaultDisabled = { value: '', disabled: (!this.isAdd) };
    this.detailForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(defaultDisabled, [Validators.required, Validators.maxLength(100)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      noHp: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      alamat: new FormControl('', [Validators.maxLength(255)]),
      jabatan: new FormControl('', [Validators.required]),
      divisi: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      userRoleId: new FormControl('', [Validators.required]),
      expiredDate: new FormControl('')
    });

    if(!this.isAdd) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.userId = params['id'];
        this.getUser();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getUser(): void {
    this.blockUI.start();
    this.userServ.getDetailUser({ id: this.userId }).subscribe(
      resp => {
        this.user = resp;
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.setValueForm(this.user);
        this.blockUI.stop();
      }
    )
  }

  private setValueForm(user: UserDetail): void {
    this.detailForm.patchValue({
      id: user.id,
      username: user.username,
      name: user.name,
      noHp: user.noHp,
      alamat: user.alamat,
      jabatan: user.jabatan,
      divisi: user.divisi,
      unit: user.unit,
      userRoleId: user.userRoleId,
      expiredDate: new Date(user.expiredDate).toISOString().substring(0, 10)
    })
  }

  private mapUser(data: any): UserDetail {
    let user: UserDetail = new UserDetail();
    user = Object.assign({}, data);

    return user
  }

  private saveUser(): void {
    this.blockUI.start();
    this.userServ.saveUser(this.mapUser(this.detailForm.getRawValue())).subscribe(
      resp => {
        this.response = resp;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.checkResultAction();
      }
    );
  }

  private checkResultAction(): void {
    if(this.response.responseCode !== "00") {
      this.globalMsgServ.changeMessage(this.response.responseDesc);
    } else {
      this.onGoToList();
    }
  }

  onSubmit(): void {
    switch (this.task) {
      case Task.Save:
        this.confirmServ.activate(ConfirmationMessage.SAVE, TitleModal.CONFIRM)
          .then(result => {
            if (result) { this.saveUser(); }
          });
        break;
      default:
        this.globalMsgServ.changeMessage('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  onSave(): void { this.task = Task.Save; }

  private onGoToList(): void {
    if (this.isAdd) {
      this.router.navigate(['../' ], { relativeTo: this.route });
    } else if (!this.isAdd) {
      this.router.navigate(['../../' ], { relativeTo: this.route });
    } else {
      this.router.navigate(['/home']);
    }
  }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) { this.onGoToList(); }
      }
    )
  }

  onKeyPress(event: any): boolean {
    if(event.which >= 48 && event.which <= 57 || event.which == 8) {
        return true
    } else {
        return event.preventDefault();
    }  
  }
}