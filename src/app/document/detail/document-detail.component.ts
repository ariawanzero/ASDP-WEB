import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { Task } from '../../shared/enum/task.enum';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { Document } from '../document';
import { ModalService } from '../../shared/service/modal.service';

@Component({
  selector: 'asdp-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;
  document: Document;
  documentId: string;
  urlFile: string;

  constructor(
    private route: ActivatedRoute,
    private documentServ: DocumentService,    
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService,
    private modalServ: ModalService
  ) { }

  ngOnInit() {
    this.getIdFromParameter();
    this.getDocument();
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.documentId = params['id'];
        this.getDocument();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getDocument(): void {
    this.blockUI.start();
    this.documentServ.getReadDetailDocument({ id: this.documentId }).subscribe(
      resp => {
        this.document = resp;
        console.log(this.document.name);
        
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onPreview(url: string): void {
    this.urlFile = url;
    console.log(url);
    this.modalServ.openModal("modal-file");
  }

}
