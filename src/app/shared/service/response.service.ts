import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';

import { CommonResponse } from '../class/common-response';
import { CommonResponsePaging } from '../class/common-response-paging';

@Injectable()
export class ResponseService {

  constructor() { }

  extractData(response: Response): any {
    if(response.status < 200 || response.status > 300) {
      throw new Error('Bad Response Status: ' + response.statusText);
    } else {
      let body: CommonResponse<any> = response.json();
      if (body.responseStatus.responseCode === "00") {
          return body.data;
      } else {
          return body.responseStatus;
      }
    }
  }

  extractDataPaging(response: CommonResponsePaging<any>): any {
    if(response.responseStatus.responseCode !== "00") {
      throw new Error('Bad Response Status: ' + response.responseStatus.responseDesc);
    } else {
      return response.paging;
    }
  }

  errorHandling(error: any): Observable<any> {
    let errMsg = error.message || 'Server Error';
    return Observable.throw(errMsg);
  }
}
