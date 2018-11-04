import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConfirmationMessage } from '../../../shared/class/confirmation-message';
import { TitleModal } from '../../../shared/class/title-modal';
import { Task } from '../../../shared/enum/task.enum';

import { ConfirmationDialogService } from '../../../shared/service/confirmation-dialog.service';
import { ModalService } from '../../../shared/service/modal.service';

@Component({
  selector: 'asdp-modal-materi-detail',
  templateUrl: './materi-detail.component.html',
  styleUrls: ['./materi-detail.component.css']
})
export class MateriDetailComponent implements OnInit {

  @Input('group')
  public detailForm: FormGroup;

  @Output('save')
  public save: EventEmitter<any> = new EventEmitter<any>();

  task: Task = Task.None;

  constructor(
    private confirmServ: ConfirmationDialogService,
    private modalServ: ModalService
  ) { }

  ngOnInit() {}

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (result) { this.modalServ.closeModal('modal-materi-header') }
      }
    )
  }

  onSave(): void { this.task = Task.Save; }

  onSubmit(): void {
    switch (this.task) {
      case Task.Save:
        this.confirmServ.activate(ConfirmationMessage.SAVE, TitleModal.CONFIRM)
          .then(result => {
            if (result) { 
              this.task = Task.None;
              this.save.emit();
            }
          });
        break;
      default:
        console.log('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }
}
