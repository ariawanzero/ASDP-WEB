import { Component, OnInit } from '@angular/core';

import { DIVISI } from '../../shared/constant/divisi';
import { SimpleObject } from '../../shared/class/simple-object';
import { DocumentFilter, Document, DocumentHistory } from '../document';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagingData } from '../../shared/class/paging-data';
import { TYPE } from '../../shared/constant/type';
import { STATS } from '../../shared/constant/stats';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { DocumentService } from '../document.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

@Component({
  selector: 'asdp-document-detail-history',
  templateUrl: './document-detail-history.component.html',
  styleUrls: ['./document-detail-history.component.css']
})
export class DocumentDetailHistoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  divisi: SimpleObject[] = DIVISI;
  type: SimpleObject[] = TYPE;
  status: SimpleObject[] = STATS;

  filter: DocumentFilter;
  page: PagingData<DocumentHistory[]>

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentServ: DocumentService,    
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.filter = new DocumentFilter();

    this.getDocumentHistoryList();
  }

  private getDocumentHistoryList(): void {
    this.blockUI.start();
    this.route.params.subscribe(
      params => {
        this.filter.id = params['id'];
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
    this.documentServ.getFilteredDetailDocumentHistory(this.filter).subscribe(
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
    this.getDocumentHistoryList();
  }

  onGoToDetail(id: string): void {
    this.router.navigate(['detail', id], { relativeTo: this.route });
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getDocumentHistoryList();
  }

}
