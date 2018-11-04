import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { MateriService } from '../materi.service';

import { Materi } from '../materi';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-materi-upload',
  templateUrl: './materi-upload.component.html',
  styleUrls: ['./materi-upload.component.css']
})
export class MateriUploadComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  materiId: string;
  dtMateri: Materi;

  selectedFiles: FileList;
  currentFile: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private materiServ: MateriService
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
        console.log(err);
      }
    );
  }

  private getMateriDetail(): void {
    this.blockUI.start();
    this.materiServ.getDetailMateri({ id: this.materiId }).subscribe(
      data => {
        this.dtMateri = data;
      }, (err) => {
        console.log(err);
        this.blockUI.stop();
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
        console.log(err);
      }, () =>{
        this.currentFile = undefined;
        this.getMateriDetail();
      }
    )
  }
}
