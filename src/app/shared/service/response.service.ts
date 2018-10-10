import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { CommonResponse } from '../class/common-response';
import { CommonResponsePaging } from '../class/common-response-paging';

@Injectable()
export class ResponseService {

  constructor() { }

  extractData(response: CommonResponse<any>): any {
    if(response.responseStatus.responseCode !== "00") {
      throw new Error('Bad Response Status: ' + response.responseStatus.responseDesc);
    } else {
      return response.data;
    }
  }

  extractDataPaging(response: CommonResponsePaging<any>): any {
    if(response.responseStatus.responseCode !== "00") {
      throw new Error('Bad Response Status: ' + response.responseStatus.responseDesc);
    } else {
      return response.paging;
    }
  }

  errorHandling(error: HttpErrorResponse): Observable<any> {
    let errMsg = "";
    if (error.error instanceof ErrorEvent) {        
      errMsg = `Error: ${error.error.message}`;
    } else {
      errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    return throwError(errMsg);
  }
}
