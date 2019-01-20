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
import { SysParam } from '../../shared/class/sysparam';
import { SysParamService } from '../../shared/service/sysparam.service';
import { LocalStorageService } from '../../shared/service/local-storage.service';

@Component({
  selector: 'asdp-document-pending',
  templateUrl: './document-pending.component.html',
  styleUrls: ['./document-pending.component.css']
})
export class DocumentPendingComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  divisi: SimpleObject[] = DIVISI;
  type: SimpleObject[] = TYPE;
  status: SimpleObject[] = STATS;
  paramReq: SysParam;

  filter: DocumentFilter;
  page: PagingData<Document[]>

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentServ: DocumentService,    
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService,
    private sysparamServ: SysParamService,
    private localStorageServ: LocalStorageService
  ) { }

  ngOnInit() {
    this.filter = new DocumentFilter();
    this.paramReq = new SysParam();
    this.getSysParamDivisi();
    this.getSysParamType();
    this.getDocumentList();
  }

  private getSysParamType(): void {
    this.paramReq.type='TYPE';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.type = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getSysParamDivisi(): void {
    this.paramReq.type='DIVISI';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.divisi = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getDocumentList(): void {
    this.blockUI.start();
    this.documentServ.getFilteredDocumentPending(this.filter).subscribe(
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

  onGoToDetail(id: string): void {
    this.router.navigate(['../detail', id], { relativeTo: this.route });
  }

  onGoToUpload(id: string): void {
      this.router.navigate(['../upload', id], { relativeTo: this.route });
  }

  onEditDocument(id: string): void {
    this.router.navigate(['../edit', id], { relativeTo: this.route });
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getDocumentList();
  }

}
