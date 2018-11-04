import { Injectable } from '@angular/core';

declare let jQuery: any;

@Injectable()
export class ModalService {
  openModal(id: string): void {
    jQuery('#' + id).modal('show');
  }

  closeModal(id: string): void {
    jQuery('#' + id).modal('hide');
  }
}
