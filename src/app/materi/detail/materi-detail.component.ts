import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';

@Component({
  selector: 'asdp-materi-detail',
  templateUrl: './materi-detail.component.html',
  styleUrls: ['./materi-detail.component.css']
})
export class MateriDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;

  isAdd: boolean;
  materiId: string;
  dtMateri: Materi;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private materiServ: MateriService
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
    this.detailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      deskripsi: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
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
    
  }

  private mapMateri(data: any): Materi {
    return null
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
