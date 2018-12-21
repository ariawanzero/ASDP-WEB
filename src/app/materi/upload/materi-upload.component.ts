import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ModalService } from '../../shared/service/modal.service';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';

@Component({
  selector: 'asdp-materi-upload',
  templateUrl: './materi-upload.component.html',
  styleUrls: ['./materi-upload.component.css']
})
export class MateriUploadComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  materiId: string;
  dtMateri: Materi;
  urlFile: string;

  selectedFiles: FileList;
  currentFile: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private materiServ: MateriService,
    private modalServ: ModalService,
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.getIdFromParameter();
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.materiId = params['id'];
        this.getMateriDetail();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getMateriDetail(): void {
    this.blockUI.start();
    this.materiServ.getDetailMateri({ id: this.materiId }).subscribe(
      data => {
        this.dtMateri = data;
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

    this.materiServ.uploadFile(this.currentFile, this.materiId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        }
      },(err) =>{
        this.globalMsgServ.changeMessage(err);
      }, () =>{
        this.currentFile = undefined;
        this.getMateriDetail();
      }
    )
  }

  onBack(): void { this.router.navigate(['../../'], { relativeTo: this.route }) }

  onPreview(url: string): void {
    this.urlFile = url;
    this.modalServ.openModal("modal-file");
  }
}
