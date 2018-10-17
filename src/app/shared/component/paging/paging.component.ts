import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { PagingData } from '../../class/paging-data';

@Component({
  selector: 'asdp-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() pagingData: PagingData<any>;

  totalData: number;  
  totalPage: number;
  pageIndex: number;
  startRow: number;
  endRow: number;
  position: number = 0;
  pages: any[];

  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    let changePagingData: SimpleChange = changes['pagingData'];
    if (typeof (changePagingData) != 'undefined') {
      this.generatePages(changePagingData.currentValue);
    }
  }

  isCurrent(current: any): boolean {
    return (this.pagingData.page + 1) === current;
  }

  generatePages(pagingData: PagingData<any>): void {
    let pageIndex: number = pagingData.page ? pagingData.page : 0;
    let totalData: number = pagingData.totalData ? pagingData.totalData : 0;
    let rowPerPage: number = pagingData.rowPerPage ? pagingData.rowPerPage : 10; // parseFloat(this.localStorage.getValue('pageSize')); 

    let startPage: number = 0;
    let endPage: number = 0;
    let pages: number[] = [];

    this.totalData = totalData;
    if (totalData > 0) {
      this.totalPage = Math.ceil(totalData / rowPerPage);
      this.pageIndex = pageIndex;

      // Display up to 7 consecutive page buttons
      startPage = (pageIndex + 1) - 3;
      endPage = (pageIndex + 1) + 3;
      if (startPage <= 0) {
        startPage = 1;
      }
      if (endPage > this.totalPage) {
        endPage = this.totalPage;
      }

      this.startRow = (pageIndex * rowPerPage) + 1;
      if ((pageIndex + 1) != this.totalPage) {
        this.endRow = (pageIndex * rowPerPage) + rowPerPage;
      } else {
        this.endRow = totalData;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    } else {
      this.totalPage = 0;
      this.pageIndex = 0;

      this.startRow = 0;
      this.endRow = 0;
    }

    this.pages = pages;
  }

  onFirstPage(): void {
    if (this.pagingData.page > 0) {
      this.notify.emit(0);
      this.position = 0;
    }
  }

  onPreviousPage(): void {
    if (this.pagingData.page > 0) {
      this.notify.emit(this.pagingData.page - 1);
      this.position = this.pagingData.page - 1;
    }
  }

  onNextPage(): void {
    if ((this.pagingData.page + 1) < this.totalPage) {
      this.notify.emit(this.pagingData.page + 1);
      this.position = this.pagingData.page + 1;
    }
  }

  onLastPage(): void {
    if ((this.pagingData.page + 1) < this.totalPage) {
      this.notify.emit(this.totalPage - 1);
      this.position = this.totalPage - 1;
    }
  }

  onSelectPage(page): void {
    if (this.position != page - 1) {
      this.notify.emit(page - 1);
      this.position = page - 1;
    }
  }

}
