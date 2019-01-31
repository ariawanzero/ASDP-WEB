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
import { SysParam } from '../sysparam';
import { SysParamService } from '../sysparam.service';
import { Type } from '@angular/compiler/src/core';
import { TYPE } from '../../shared/constant/type';

@Component({
  selector: 'asdp-sysparam-detail',
  templateUrl: './sysparam-detail.component.html',
  styleUrls: ['./sysparam-detail.component.css']
})
export class SysParamDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  type: SimpleObject[] = TYPE;

  task: Task = Task.None;

  isAdd: boolean;
  code: string;
  sysparam: SysParam;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private sysparamServ: SysParamService
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
      code: new FormControl(defaultDisabled, [Validators.required, Validators.maxLength(100)]),
      type: new FormControl('', [Validators.required]),
    });

    if(!this.isAdd) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.code = params['code'];
        this.getSysParam();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getSysParam(): void {
    this.blockUI.start();
    this.sysparamServ.getDetailSysParam({ code: this.code }).subscribe(
      resp => {
        this.sysparam = resp;
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.setValueForm(this.sysparam);
        this.blockUI.stop();
      }
    )
  }

  private setValueForm(sysparam: SysParam): void {
    this.detailForm.patchValue({
      code: sysparam.code,
      value: sysparam.value,
      type: sysparam.type
    })
  }

  private mapSysParam(data: any): SysParam {
    let sysparam: SysParam = new SysParam();
    sysparam = Object.assign({}, data);
    sysparam.value = sysparam.code;

    return sysparam
  }

  private saveSysParam(): void {
    this.blockUI.start();
    this.sysparamServ.saveSysParam(this.mapSysParam(this.detailForm.getRawValue())).subscribe(
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
            if (result) { this.saveSysParam(); }
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