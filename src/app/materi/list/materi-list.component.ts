import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { SimpleObject } from '../../shared/class/simple-object';
import { PagingData } from '../../shared/class/paging-data';

import { DIVISI } from '../../shared/constant/divisi';

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

  divisi: SimpleObject[] = DIVISI;

  filter: MateriFilter;
  page: PagingData<Materi[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private materiServ: MateriService,    
    private globalMsgServ: GlobalMessageService
  ) { }

  ngOnInit() {
    this.filter = new MateriFilter();
  
    this.getMateriList();
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
    this.getMateriList();
  }

  onAdd(): void { 
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onEditQuiz(id: string): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onNotify(idx: number): void {
    this.filter.page = idx;
    this.getMateriList();
  }

  onGoToUpload(id: string): void {
    this.router.navigate(['upload', id], { relativeTo: this.route });
  }

  onGoToQuestion(id: string): void {
    this.router.navigate(['question', id], { relativeTo: this.route });
  }
}
