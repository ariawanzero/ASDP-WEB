import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { Task } from '../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';

import { MateriService } from '../materi.service';

import { MateriRequest } from '../materi';

@Component({
  selector: 'asdp-materi-detail',
  templateUrl: './materi-detail.component.html',
  styleUrls: ['./materi-detail.component.css']
})
export class MateriDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  task: Task = Task.None;

  isAdd: boolean;
  materiId: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  detailForm: FormGroup;
  formData: FormData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
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
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      file: new FormControl(null)
    });

    if(!this.isAdd) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.materiId = params['id'];
        this.getMateri();
      }, err => { 
        console.log(err);
      }
    );
  }

  private getMateri(): void {
    this.blockUI.start();
    this.materiServ.getDetailMateri({ id: this.materiId }).subscribe(
      resp => {
        console.log(resp);
        // this.user = resp;
      }, err => {
        this.blockUI.stop();
        console.log(err);
      }, () => {
        // this.setValueForm(this.user);
        this.blockUI.stop();
      }
    )
  }

  onFileChange(event: any): void {
    let reader: FileReader = new FileReader();

    if(event.target.files && event.target.files.length) {
      this.selectedFiles = event.target.files;
      this.detailForm.patchValue({
        file: event.target.files
      })
    }
  }

  private mapMateri(data: any): MateriRequest {
    let materiReq: MateriRequest = new MateriRequest();
    materiReq = Object.assign({}, data);
    
    return materiReq;
  }

  private saveMateri(): void {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.materiServ.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log(event);
    });
 
    // this.blockUI.start();
    // this.materiServ.saveMateri(this.mapMateri(this.detailForm.getRawValue())).subscribe(
    //   resp => {
    //     console.log(resp);
    //   }, (err) => {
    //     console.log(err);
    //     this.blockUI.stop();
    //   }
    // )
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

  onGoToList(): void {
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
}
