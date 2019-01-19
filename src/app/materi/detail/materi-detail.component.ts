import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DIVISI } from '../../shared/constant/divisi';

import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { SimpleObject } from '../../shared/class/simple-object';

import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';
import { SysParam } from '../../shared/class/sysparam';
import { SysParamService } from '../../shared/service/sysparam.service';

@Component({
  selector: 'asdp-materi-detail',
  templateUrl: './materi-detail.component.html',
  styleUrls: ['./materi-detail.component.css']
})
export class MateriDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;

  divisi: SimpleObject[] = DIVISI;

  isAdd: boolean;
  materiId: string;
  dtMateri: Materi;
  paramReq: SysParam;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private materiServ: MateriService,
    private sysparamServ: SysParamService
  ) { }

  ngOnInit() { 
    let state = this.route.snapshot.data['state'];
    this.paramReq = new SysParam();
    this.getSysParamDivisi();
    this.checkStateAction(state);
  }

  private getSysParamDivisi(): void {
    this.paramReq.type='DIVISI';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.divisi = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private checkStateAction(action: string): void {
    this.isAdd = action === "add" ? true : false;
    this.setForm();
  }

  private setForm(): void {
    this.detailForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(''),
      divisi: new FormControl([], [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      totalQuiz: new FormControl('', [Validators.required])
    });

    if(!this.isAdd) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.materiId = params['id'];
        this.getMateri();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getMateri(): void {
    this.blockUI.start();
    this.materiServ.getDetailMateri({ id: this.materiId }).subscribe(
      resp => {
        this.dtMateri = resp;
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.setValueForm(this.dtMateri);
        this.blockUI.stop();
      }
    )
  }

  private setValueForm(user: Materi): void {
    this.detailForm.patchValue({
      id: user.id,
      name: user.name,
      divisi: JSON.parse(user.divisi),
      description: user.description,
      startDate: new Date(user.startDate).toISOString().slice(0, -8),
      endDate: new Date(user.endDate).toISOString().slice(0, -8),
      totalQuiz: user.totalQuiz
    });
  }

  private mapMateri(data: any): Materi {
    let mt: Materi = new Materi();
    Object.assign(mt, data, { divisi: JSON.stringify(data.divisi) });

    return mt;
  }

  private saveMateri(): void {
    this.blockUI.start();
    this.materiServ.saveMateriHeader(this.mapMateri(this.detailForm.getRawValue())).subscribe(
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
            if (result) { this.saveMateri(); }
          });
        break;
      default:
        this.globalMsgServ.changeMessage('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  onSave(): void { this.task = Task.Save; }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) { this.onGoToList();}
      }
    )
  }

  private onGoToList(): void {
    if (this.isAdd) {
      this.router.navigate(['../' ], { relativeTo: this.route });
    } else if (!this.isAdd) {
      this.router.navigate(['../../' ], { relativeTo: this.route });
    } else {
      this.router.navigate(['/home']);
    }
  }
}
