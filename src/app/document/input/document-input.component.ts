import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { Task } from '../../shared/enum/task.enum';
import { DIVISI } from '../../shared/constant/divisi';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SimpleObject } from '../../shared/class/simple-object';
import { TYPE } from '../../shared/constant/type';
import { STATS } from '../../shared/constant/stats';
import { SOP } from '../../shared/constant/sop';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { DocumentService } from '../document.service';
import { CATEGORY } from '../../shared/constant/category';
import { Document } from '../document';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { SysParam } from '../../shared/class/sysparam';
import { SysParamService } from '../../shared/service/sysparam.service';

@Component({
  selector: 'app-document-input',
  templateUrl: './document-input.component.html',
  styleUrls: ['./document-input.component.css']
})
export class DocumentInputComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;

  divisi: SimpleObject[];
  type: SimpleObject[];
  status: SimpleObject[] = STATS;
  sop: SimpleObject[];
  category: SimpleObject[];
  paramReq: SysParam;
  showTumbnail: string;

  isAdd: boolean;
  isAddUser: boolean;
  documentId: string;
  typeValue: string;
  dtMateri: Document;


  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private globalMsgServ: GlobalMessageService,
    private documentServ: DocumentService,
    private sysparamServ: SysParamService
  ) { }

  ngOnInit() {
    let state = this.route.snapshot.data['state'];
    this.paramReq = new SysParam();
    this.getSysParamDivisi();
    this.getSysParamSop();
    this.getSysParamType();
    this.getSysParamCategory();
    this.checkStateAction(state);
    
  }

  private getSysParamSop(): void {
    this.paramReq.type='SOP';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.sop = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getSysParamCategory(): void {
    this.paramReq.type='CATEGORY';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.category = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getSysParamType(): void {
    this.paramReq.type='TYPE';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.type = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private getSysParamDivisi(): void {
    this.paramReq.type='DIVISI';
    this.sysparamServ.getSysParamByType(this.paramReq).subscribe(
      resp => {
        this.divisi = resp;
      },(err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }
    )
  }

  private checkStateAction(action: string): void {
    this.isAdd = action === "add" ? true : false;
    this.isAddUser = action === "addUser" ? true : false;
    this.setForm();
  }

  private setForm(): void {
    this.detailForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(''),
      sop: new FormControl([]),
      divisi: new FormControl([], [Validators.required]),
      type: new FormControl([], [Validators.required]),
      category: new FormControl([], [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      tumbnail: new FormControl(''),
      facebook: new FormControl(false),
      twitter: new FormControl(false),
      instagram: new FormControl(false)
    });

    if(!this.isAdd && !this.isAddUser) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.documentId = params['id'];
        this.getDocument();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getDocument(): void {
    this.blockUI.start();
    this.documentServ.getDetailDocument({ id: this.documentId }).subscribe(
      resp => {
        this.dtMateri = resp;
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.setValueForm(this.dtMateri);
        this.blockUI.stop();
      }
    )
  }

  onChangeType(value: string): void {
    this.typeValue = value;
    
    this.resetValidation();
    this.resetValue();

    this.setValidation(this.typeValue);
  }

  private setValidation(type: string): void {
    switch(type) {
        case 'SOP':
            this.changeValidationForSOP();
            break;
    }
  }

  private changeValidationForSOP(): void {
    this.detailForm.get('sop').setValidators([Validators.required])
  }

  private resetValidation(): void {
    this.detailForm.get('sop').clearValidators();
    this.detailForm.get('sop').updateValueAndValidity();
  }

  private resetValue(): void {
    this.detailForm.patchValue({
      sop: ''
    })
  }

  private setValueForm(doc: Document): void {
    this.detailForm.patchValue({
      id: doc.id,
      name: doc.name,
      divisi: JSON.parse(doc.divisi),
      description: doc.description,
      startDate: new Date(doc.startDate).toISOString().substring(0, 10),
      endDate: new Date(doc.endDate).toISOString().substring(0, 10),
      sop: doc.sop,
      type: doc.type,
      category: doc.category ,
      facebook: doc.facebook,
      twitter: doc.twitter,
      tumbnail: doc.tumbnail,
      instagram: doc.instagram
    });
    if(doc.tumbnail != null){
      this.showTumbnail = doc.tumbnail;
    }
  }

  onSave(): void { this.task = Task.Save; }

  onSubmit(): void {
    switch (this.task) {
      case Task.Save:
        this.confirmServ.activate(ConfirmationMessage.SAVE, TitleModal.CONFIRM)
          .then(result => {
            if (result) { this.saveMateri(); }
          });
        break;
      default:
        this.globalMsgServ.changeMessage('Unhandled Task');
        this.task = Task.None;
        break;
    }
  }

  private saveMateri(): void {
    this.blockUI.start();
    this.documentServ.saveDocument(this.mapDocument(this.detailForm.getRawValue())).subscribe(
      resp => {
        this.response = resp;
      }, (err) => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.checkResultAction();
      }
    );
  }

  private mapDocument(data: any): Document {
    let dc: Document = new Document();
    Object.assign( dc, data, { divisi: JSON.stringify(data.divisi) });

    return dc;
  }

  private checkResultAction(): void {
    if(this.response.responseCode !== "00") {
      this.globalMsgServ.changeMessage(this.response.responseDesc);
    } else {
      this.onGoToList();
    }
  }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.CANCEL, TitleModal.CONFIRM).then(
      result => {
        if (this.isAddUser) {
          this.isAddUser = false;
          this.isAdd = true;
          if (result) { this.onGoToList();}
        }else{
          if (result) { this.onGoToList();}
        }
      }
    )
  }

  private onGoToList(): void {
    if (this.isAddUser) {
      this.router.navigate(['../pending' ], { relativeTo: this.route });
    } else if (this.isAdd) {
      this.router.navigate(['../' ], { relativeTo: this.route });
    } else if (!this.isAdd && !this.isAddUser) {
      this.router.navigate(['../../' ], { relativeTo: this.route });
    } else {
      this.router.navigate(['/home']);
    }
  }

  onSelectFile(event: any): void {
    let reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.detailForm.patchValue({
          tumbnail: reader.result
        })
        this.showTumbnail = reader.result;
      }
    }
  }
}
