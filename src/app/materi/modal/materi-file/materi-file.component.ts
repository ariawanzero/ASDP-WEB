import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ModalService } from '../../../shared/service/modal.service';

@Component({
  selector: 'asdp-modal-materi-file',
  templateUrl: './materi-file.component.html',
  styleUrls: ['./materi-file.component.css']
})
export class MateriFileComponent implements OnInit {

  @Input("urlFile")
  public urlFile: string;

  constructor(
    public sanitizer: DomSanitizer,
    public modalServ: ModalService
  ) { }

  ngOnInit() {}

  onClose() { this.modalServ.closeModal("modal-materi-file"); }
}
