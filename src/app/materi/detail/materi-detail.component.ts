import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';

@Component({
  selector: 'asdp-materi-detail',
  templateUrl: './materi-detail.component.html',
  styleUrls: ['./materi-detail.component.css']
})
export class MateriDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  task: Task = Task.None;

  materiId: string;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private materiServ: MateriService
  ) { }

  ngOnInit() {
    let state = this.route.snapshot.data['state'];
    this.setForm();
  }

  private setForm(): void {
    this.detailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  private mapHeader(data: any): Materi {
    let dt: Materi = new Materi();
    dt = Object.assign({}, data);

    return dt;
  }

  private saveMateri(): void {  
    this.blockUI.start();
    this.materiServ.saveMateriHeader(this.mapHeader(this.detailForm.getRawValue())).subscribe(
      resp => {
        this.materiId = resp;
      }, (err) => {
        console.log(err);
        this.blockUI.stop();
      }, () => {
        this.blockUI.stop();
        this.onGoToUpload();
      }
    )
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
        console.log('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  onSave(): void { this.task = Task.Save; }

  private onGoToList(): void {
    this.router.navigate(['../' ], { relativeTo: this.route });
  }

  private onGoToUpload(): void {
    this.router.navigate(['../upload', this.materiId], { relativeTo: this.route });
  }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) { this.onGoToList(); }
      }
    )
  }
}
