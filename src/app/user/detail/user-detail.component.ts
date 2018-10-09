import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ROLE } from '../../shared/constant/role';
import { JABATAN } from '../../shared/constant/jabatan';
import { DIVISI } from '../../shared/constant/divisi';

import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';
import { SimpleObject } from '../../shared/class/simple-object';

import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';

import { UserService } from '../user.service';

import { UserDetail, User } from '../user';

@Component({
  selector: 'asdp-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  role: SimpleObject[] = ROLE;
  jabatan: SimpleObject[] = JABATAN;
  divisi: SimpleObject[] = DIVISI;

  isAdd: boolean;
  userId: string;
  user: UserDetail;

  detailForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmServ: ConfirmationDialogService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    let state = this.route.snapshot.data['state'];
    this.checkStateAction(state);
  }

  private checkStateAction(action: string) {
    if(action === "add") {
      this.isAdd = true;
    } else {
      this.isAdd = false;
    }

    this.setForm();
  }

  private setForm(): void {
    let defaultDisabled = { value: '', disabled: (this.isAdd) };
    this.detailForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(defaultDisabled, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      noHp: new FormControl('', [Validators.required]),
      alamat: new FormControl('', [Validators.maxLength(255)]),
      jabatan: new FormControl('', [Validators.required]),
      divisi: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      expired: new FormControl('', [Validators.required])
    });

    if(!this.isAdd) { this.getIdFromParameter(); }
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.userId = params['id'];
        this.getUser();
      }, err => { 
        console.log(err);
      }
    );
  }

  private getUser(): void {
    this.blockUI.start();
    this.userServ.getSingleUser({ id: this.userId }).subscribe(
      resp => {
        this.user = resp;
      }, err => {
        console.log(err);
      }, () => {
        this.setValueForm(this.user);
      }
    )
  }

  private setValueForm(user: UserDetail): void {
    this.detailForm.patchValue({
      id: user.id,
      username: user.username,
      name: user.name,
      noHp: user.noHp,
      alamat: user.alamat,
      jabatan: user.jabatan,
      divisi: user.divisi,
      unit: user.unit,
      role: user.userRoleId,
      expired: user.expired
    })
  }





  onGoToList(): void {
    // if (this.isAdd) {
    //   this.router.navigate(['../' ], { relativeTo: this.route });
    // } else if (this.isEdit) {
    //   this.router.navigate(['../../' ], { relativeTo: this.route });
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }

  onCancel(): void {
    this.confirmServ.activate(ConfirmationMessage.SAVE, TitleModal.CONFIRM).then(
      result => {

      }
    )
  }

}
