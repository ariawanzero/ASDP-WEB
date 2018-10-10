import { Injectable } from '@angular/core';

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

  extractResultAction(response: CommonResponse<any>): any {
    if(response.responseStatus.responseCode !== "00") {
      throw new Error('Bad Response Status: ' + response.responseStatus.responseDesc);
    } else {
      return response.responseStatus;
    }
  }
}
