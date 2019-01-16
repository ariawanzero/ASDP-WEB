import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { saveAs as importedSaveAs } from "file-saver";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';

import { GlobalMessageService } from '../../shared/service/global-message.service';

import { ResultService } from '../result.service';

import { ResultQuizFilter, ResultQuiz } from '../result';

@Component({
  selector: 'asdp-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  file: any;
  filter: ResultQuizFilter;
  page: PagingData<ResultQuiz[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resultServ: ResultService,    
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.filter = new ResultQuizFilter();
  
    this.getResultQuizList();
  }

  private getResultQuizList(): void {
    this.blockUI.start();
    this.resultServ.getFilteredResultQuiz(this.filter).subscribe(
      resp => {
        this.page = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
      }
    )
  }

  onSearch(): void { 
    this.filter.page = 0;
    this.getResultQuizList();
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getResultQuizList();
  }

  onDownloadFile(id: string): void {
    this.downloadFileData(id);
  }

  private downloadFileData(id: string): void {
    let filename = id + ".csv";
    
    this.blockUI.start();
    this.resultServ.getFileDownloadResultQuiz(id).subscribe(
      blob => {
        this.file = blob;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        importedSaveAs(this.file, filename);
        this.blockUI.stop();
      }
    );
  }
}
