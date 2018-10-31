import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagingData } from '../../shared/class/paging-data';

import { MateriService } from '../materi.service';

import { MateriFilter, Materi } from '../materi';

@Component({
  selector: 'asdp-materi-list',
  templateUrl: './materi-list.component.html',
  styleUrls: ['./materi-list.component.css']
})
export class MateriListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  filter: MateriFilter;
  page: PagingData<Materi[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private materServ: MateriService
  ) { }

  ngOnInit() {
    this.filter = new MateriFilter();

    this.getMateriList();
  }

  private getMateriList(): void {
    this.blockUI.start();
    this.materServ.getFilteredMateri(this.filter).subscribe(
      resp => {
        this.page = resp;
      },(err) => {
        console.log(err);
        this.blockUI.stop();
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
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onNotify(idx: number) {
    this.filter.page = idx;
    this.getMateriList();
  }

}
