import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';
import { CommonResponseStatus } from '../../shared/class/common-response-status';

import { ModalService } from '../../shared/service/modal.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';

import { MateriService } from '../materi.service';

import { MateriFilter, Materi } from '../materi';


@Component({
  selector: 'asdp-materi-list',
  templateUrl: './materi-list.component.html',
  styleUrls: ['./materi-list.component.css']
})
export class MateriListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  detailForm: FormGroup;

  filter: MateriFilter;
  page: PagingData<Materi[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private materiServ: MateriService,
    private modalServ: ModalService,
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.filter = new MateriFilter();
    
    this.setForm();
    this.getMateriList();
  }

  private setForm(): void {
    this.detailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  private getMateriList(): void {
    this.blockUI.start();
    this.materiServ.getFilteredMateri(this.filter).subscribe(
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
    this.getMateriList();
  }

  onAdd(): void {
    this.detailForm.reset();
    this.modalServ.openModal("modal-materi-header");
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getMateriList();
  }

  private mapHeader(data: any): Materi {
    let dt: Materi = new Materi();
    dt = Object.assign({}, data);

    return dt;
  }

  onSaveHeader(): void {
    this.blockUI.start();
    this.materiServ.saveMateriHeader(this.mapHeader(this.detailForm.getRawValue())).subscribe(
      resp => {
        this.response = resp;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.checkResultSave();
      }
    )
  }

  private checkResultSave(): void {
    if(this.response.responseCode !== "00") {
      this.globalMsgServ.changeMessage(this.response.responseDesc);
    } else {
      this.modalServ.closeModal("modal-materi-header");
      this.getMateriList();
    }
  }
  
  onGoToUpload(id: string): void {
    this.router.navigate(['upload', id], { relativeTo: this.route });
  }
}
