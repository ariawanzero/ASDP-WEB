import { CommonResponseStatus } from "./common-response-status";
import { PagingData } from "./paging-data";

export class CommonResponsePaging<T> {
    responseStatus: CommonResponseStatus;
    requestId: string;
    paging: PagingData<T>;
}