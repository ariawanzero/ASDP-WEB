import { Component, OnInit } from '@angular/core';

import { DIVISI } from '../../shared/constant/divisi';
import { SimpleObject } from '../../shared/class/simple-object';
import { DocumentFilter, Document } from '../document';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagingData } from '../../shared/class/paging-data';
import { TYPE } from '../../shared/constant/type';
import { STATS } from '../../shared/constant/stats';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { DocumentService } from '../document.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

@Component({
  selector: 'asdp-document-history',
  templateUrl: './document-history.component.html',
  styleUrls: ['./document-history.component.css']
})
export class DocumentHistoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  divisi: SimpleObject[] = DIVISI;
  type: SimpleObject[] = TYPE;
  status: SimpleObject[] = STATS;

  filter: DocumentFilter;
  page: PagingData<Document[]>

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentServ: DocumentService,    
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.filter = new DocumentFilter();

    this.getDocumentList();
  }

  private getDocumentList(): void {
    this.blockUI.start();
    this.documentServ.getFilteredDocumentHistory(this.filter).subscribe(
      resp => {
        this.page = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.remaping();
      }
    )
  }

  private remaping(): void {
    if(this.page.data) {
      this.page.data.forEach(data => {
        data.divisiDisplay = JSON.parse(data.divisi);
      })
    }
  }

  onSearch(): void { 
    this.filter.page = 0;
    this.getDocumentList();
  }

  onGoToDetailHistory(id: string): void {
    this.router.navigate(['../detailHistory', id], { relativeTo: this.route });
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getDocumentList();
  }

}
