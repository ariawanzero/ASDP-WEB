import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmationDialogService {
  public activate: (message?: string, title?: string) => Promise<boolean>;
}
