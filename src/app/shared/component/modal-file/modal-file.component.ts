import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'asdp-modal-file',
  templateUrl: './modal-file.component.html',
  styleUrls: ['./modal-file.component.css']
})
export class ModalFileComponent implements OnInit {

  @Input("urlFile")
  public urlFile: string;

  constructor(
    public sanitizer: DomSanitizer,
    public modalServ: ModalService
  ) { }

  ngOnInit() {}

  onClose() { this.modalServ.closeModal("modal-file"); }
}
