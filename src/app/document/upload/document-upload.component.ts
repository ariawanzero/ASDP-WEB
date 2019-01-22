import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ModalService } from '../../shared/service/modal.service';

import { DocumentService } from '../document.service';

import { Document } from '../document';
import { LocalStorageService } from '../../shared/service/local-storage.service';

@Component({
  selector: 'asdp-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  documentId: string;
  dtDocument: Document;
  urlFile: string;
  isUploadUser: boolean;

  selectedFiles: FileList;
  currentFile: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentServ: DocumentService,
    private modalServ: ModalService,
    private globalMsgServ: GlobalMessageService,
    private localStorageServ: LocalStorageService
  ) { }

  ngOnInit() {
    this.isUploadUser = this.localStorageServ.getValue('client-role-name') === "USER" ? true : false;
    this.getIdFromParameter();
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.documentId = params['id'];
        this.getDocumentDetail();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getDocumentDetail(): void {
    this.blockUI.start();
    this.documentServ.getDetailDocument({ id: this.documentId }).subscribe(
      data => {
        this.dtDocument = data;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onSelectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onUpload(): void {
    this.currentFile = this.selectedFiles.item(0);

    this.documentServ.uploadFile(this.currentFile, this.documentId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        }
      },(err) =>{
        this.globalMsgServ.changeMessage(err);
      }, () =>{
        this.currentFile = undefined;
        this.getDocumentDetail();
      }
    )
  }

  onBack(): void { 
    if(this.isUploadUser){
      this.router.navigate(['../../pending'], { relativeTo: this.route }) ;
    }else{
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  onPreview(url: string): void {
    this.urlFile = url;
    this.modalServ.openModal("modal-file");
  }
}
