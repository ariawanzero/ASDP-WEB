import { CommonResponseStatus } from "./common-response-status";

export class CommonResponse<T> {
    responseStatus: CommonResponseStatus;
    requestId: string;
    data?: T;
}