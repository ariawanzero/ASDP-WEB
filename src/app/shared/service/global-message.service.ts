import { Injectable } from '@angular/core';

@Injectable()
export class GlobalMessageService {
  public changeMessage: (message?: string) => void;
}
