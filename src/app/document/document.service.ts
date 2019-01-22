import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagingData } from '../shared/class/paging-data';

import { ResponseService } from '../shared/service/response.service';
import { Document, DocumentFilter, DocumentHistory } from './document';

@Injectable()
export class DocumentService {

  constructor(
    private http: HttpClient,
    private respService: ResponseService
  ) { }

  saveDocument(value: Document): Observable<any> { 
    return this.http.post(('/document/saveDocument'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }

  getFilteredDocument(value: DocumentFilter): Observable<PagingData<Document[]>> { 
    return this.http.post(('/document/searchDocument'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getFilteredDocumentHistory(value: DocumentFilter): Observable<PagingData<Document[]>> { 
    return this.http.post(('/document/searchDocumentHistory'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getFilteredDetailDocumentHistory(value: DocumentFilter): Observable<PagingData<DocumentHistory[]>> { 
    return this.http.post(('/document/searchDetailDocumentHistory'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getFilteredDocumentPending(value: DocumentFilter): Observable<PagingData<Document[]>> { 
    return this.http.post(('/document/searchDocumentPending'), value)
      .pipe(
        map(this.respService.extractDataPaging)
      )
  }

  getDetailDocument(value: any): Observable<any> {
    return this.http.post(('/document/findDocumentDetail'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

  getReadDetailDocument(value: any): Observable<any> {
    return this.http.post(('/document/readDocumentDetail'), value)
      .pipe(
        map(this.respService.extractData)
      )
  }

  uploadFile(file: File, id: string): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    
    formData.append('file', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', '/document/uploadDocument', formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.request(req);
  }

  approveDocument(value: any): Observable<any> {
    return this.http.post(('/document/approveDocument'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }

  rejectedDocument(value: any): Observable<any> {
    return this.http.post(('/document/rejectedDocument'), value)
      .pipe(
        map(this.respService.extractResultAction)
      )
  }
}
